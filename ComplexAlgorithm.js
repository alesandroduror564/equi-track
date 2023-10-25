/*  
   Filename: ComplexAlgorithm.js
   Description: This code demonstrates a complex algorithm for solving the traveling salesman problem using a genetic algorithm approach.
*/

// Global variables
var populationSize = 50; // Number of individuals in each population
var numCities = 10; // Number of cities in the problem
var cities = []; // Array of city coordinates
var population = []; // Array of individuals in the population

// City class
class City {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Generate random city coordinates
function generateCities() {
  for (var i = 0; i < numCities; i++) {
    cities.push(new City(Math.random() * 100, Math.random() * 100));
  }
}

// Individual class
class Individual {
  constructor() {
    this.order = []; // Order in which cities are visited
    this.fitness = 0; // Fitness value
  }

  // Generate a random order of cities
  generateOrder() {
    for (var i = 0; i < numCities; i++) {
      this.order.push(i);
    }
    shuffleArray(this.order);
  }

  // Calculate the fitness value of the individual
  calculateFitness() {
    var totalDistance = 0;
    for (var i = 0; i < numCities - 1; i++) {
      var cityA = cities[this.order[i]];
      var cityB = cities[this.order[i + 1]];
      var d = calculateDistance(cityA, cityB);
      totalDistance += d;
    }
    this.fitness = 1 / totalDistance;
  }
}

// Generate initial population
function generatePopulation() {
  for (var i = 0; i < populationSize; i++) {
    var individual = new Individual();
    individual.generateOrder();
    individual.calculateFitness();
    population.push(individual);
  }
}

// Calculate the Euclidean distance between two cities
function calculateDistance(cityA, cityB) {
  var dx = cityA.x - cityB.x;
  var dy = cityA.y - cityB.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Shuffle array elements using Fisher-Yates algorithm
function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Evolution process
function evolve() {
  var newPopulation = [];

  // Elitism: Keep the best individual in the new population
  newPopulation.push(getBestIndividual());

  // Crossover: Generate offspring through crossover and mutation
  while (newPopulation.length < populationSize) {
    var parentA = selection();
    var parentB = selection();
    var offspring = crossover(parentA, parentB);
    mutate(offspring);
    newPopulation.push(offspring);
  }

  population = newPopulation;
}

// Tournament selection
function selection() {
  var tournamentSize = 5;
  var tournament = [];
  for (var i = 0; i < tournamentSize; i++) {
    var randomIndex = Math.floor(Math.random() * population.length);
    tournament.push(population[randomIndex]);
  }
  return getBestIndividual(tournament);
}

// Order-based crossover
function crossover(parentA, parentB) {
  var start = Math.floor(Math.random() * parentA.order.length);
  var end = Math.floor(Math.random() * parentA.order.length);

  var child = new Individual();
  for (var i = 0; i < parentA.order.length; i++) {
    if (start < end && i > start && i < end) {
      child.order[i] = parentA.order[i];
    } else if (start > end) {
      if (!(i < start && i > end)) {
        child.order[i] = parentA.order[i];
      }
    }
  }

  for (var i = 0; i < parentB.order.length; i++) {
    if (!child.order.includes(parentB.order[i])) {
      for (var j = 0; j < child.order.length; j++) {
        if (child.order[j] == undefined) {
          child.order[j] = parentB.order[i];
          break;
        }
      }
    }
  }

  return child;
}

// Swap two cities in an individual's order
function mutate(individual) {
  var indexA = Math.floor(Math.random() * individual.order.length);
  var indexB = Math.floor(Math.random() * individual.order.length);
  swap(individual.order, indexA, indexB);
}

// Swap two elements in an array
function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// Get the best individual in the population
function getBestIndividual() {
  var bestFitness = -Infinity;
  var bestIndividual;
  for (var i = 0; i < population.length; i++) {
    if (population[i].fitness > bestFitness) {
      bestFitness = population[i].fitness;
      bestIndividual = population[i];
    }
  }
  return bestIndividual;
}

// Run the genetic algorithm for a specified number of generations
function runGeneticAlgorithm(generations) {
  generateCities();
  generatePopulation();
  for (var i = 0; i < generations; i++) {
    evolve();
  }
  var bestIndividual = getBestIndividual();
  console.log("Best Individual:", bestIndividual);
}

// Run the genetic algorithm for 100 generations
runGeneticAlgorithm(100);