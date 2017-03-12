class Population {
  constructor(goal, size) {
    this.goal = goal
    this.start = Date.now()
    this.generationNumber = 0
    this.members = []
    this.populate(goal, size)
  }

  checkResults() {
    if (this.members[0].cost === 0) {
      console.log('Yaaaay! I found the answer!')
      console.log(this.members[0])
      console.log(`Took ${Date.now() - this.start}ms & ${this.generationNumber} generations`)
      return true
    }
    return false
  }

  display() {
    console.log(`Generation #${this.generationNumber}, best score: ${this.members[0].cost}`)
    console.table(this.members.slice(0, 10), "code", "cost")
  }

  nextGeneration(limit) {
    const children = []
    for (let i = 0; i < limit; i++) {
      const parentA = this.members[i]
      this.members.slice(i, limit).forEach(parentB => {
        children.push(...(parentA.mate(parentB)))
      })
    }
    return children
  }

  mutate(chance) {
    this.members.forEach(chrom => chrom.mutate(chance))
  }

  populate(goal, size) {
    while (size--) {
      this.members.push(
        Chromosome.random(goal.length)
      )
    }
  }

  sort() {
    this.members.sort((a, b) => a.cost - b.cost)
  }

  generation() {
    this.members.forEach(chrom => chrom.calculateCost(this.goal))

    this.sort()

    this.display()
    if (this.checkResults()) return;  

    const children = this.nextGeneration(10)

    this.members = this.members.slice(0, -1 * children.length).concat(children)

    this.mutate(0.5)

    this.generationNumber += 1

    setTimeout(this.generation.bind(this), 100)
  }
}

class Chromosome {
  constructor(code) {
    this.code = code || ''
    this.cost = 999 
  }

  static random(length) {
    let code = ''
    while (length--) {
      code += String.fromCharCode(Math.floor(Math.random()*255))
    }
    return new Chromosome(code)
  }

  calculateCost(compareTo) {
    let cost = 0
    this.code.split('').forEach((_, i) => {
      cost += (this.code.charCodeAt(i) - compareTo.charCodeAt(i)) ** 2
    })
    this.cost = cost
  }

  mate(chromosome) {
    const pivot = Math.round(this.code.length / 2)
    const child1 = this.code.substring(0, pivot) + chromosome.code.substring(pivot)
    const child2 = chromosome.code.substring(0, pivot) + this.code.substring(pivot)
    return [new Chromosome(child1), new Chromosome(child2)]
  }

  mutate(chance) {
    const shouldMutate = Math.random() < chance
    if (shouldMutate) {
      const mutateIndex = Math.floor(Math.random() * this.code.length)
      const newChar = Math.floor((Math.random() * (127 - 32)) + 32)
      this.code = this.code.substring(0, mutateIndex) + String.fromCharCode(newChar) + this.code.substring(mutateIndex + 1)
    }
  }
}


window.addEventListener("DOMContentLoaded", ()=>{
  console.log('Loading...')
  const population = new Population('Hello, world!', 20)
  population.generation()
})