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
    const child1 = this.code.substr(0, pivot) + chromosome.substr(pivot)
    const child2 = chromosome.substr(0, pivot) + this.code.substr(pitot)
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

module.exports Chromosome
