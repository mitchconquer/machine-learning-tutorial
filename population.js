const Chromosome = require('./chromosome')

class Population {
  constructor(goal, size) {
    this.goal = goal
    this.size = size
    this.generationNumber = 0
    this.members = []
    this.populate(goal, size)
  }

  checkResults() {
    if (this.members[0].cost === 0) {
      console.log('Yaaaay! I found the answer!')
      return true
    }
    return false
  }

  display() {
    this.members.forEach(chrom => {
      console.log(`${chrom.code} - ${chrom.cost}`)
    })
  }

  mate() {
    return this.members[0].mate(this.members[1])
  }

  mutate(chance) {
    this.members.forEach(chrom => chrom.mutate(chance))
  }

  populate(goal, size) {
    while (size--) {
      this.members.push(
        new Chromosome(goal.length)
      )
    }
  }

  sort() {
    this.members.sort((a, b) => a.cost - b.cost)
  }

  generation() {
    this.members.forEach(chrom => chrom.calculateCost(this.goal))

    this.sort()

    if (this.checkResults()) return;  

    this.display()

    const children = this.mate()

    this.mutate(0.5)

    this.members = this.members.slice(0, -1 * children.length).concat(children)

    this.generation += 1

    setTimeout(this.generation.bind(this), 100)
  }
}

module.exports = Population
