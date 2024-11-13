import { AppState } from "../AppState.js"


export class Pokemon {
  constructor(data) {
    this.name = data.name
  }

  get isActive() {
    return this.name == AppState.activePokemon?.name
  }

  get listHTMLTemplate() {
    return `
    <li onclick="app.WildPokemonsController.getWildPokemonDetailsByName('${this.name}')" class="d-flex gap-2 align-items-center mb-1" role="button" title="See details for ${this.name}">
      <i class="mdi mdi-pokeball ${this.isActive ? 'mdi-spin' : ''}"></i>
      <span class="text-capitalize ${this.isActive ? 'text-light' : 'text-success'}">${this.name}</span>
    </li>
    `
  }

}

export class DetailedPokemon extends Pokemon {
  constructor(data) {
    super(data)
    this.id = data._id ?? ''
    this.nickName = data.nickName ?? ''
    this.img = data.img ?? data.sprites.front_default
    this.backImg = data.backImg ?? data.sprites.back_default
    this.weight = data.weight
    this.height = data.height
    this.health = data.health ?? data.stats[0].base_stat
    this.defense = data.defense ?? data.stats[2].base_stat
    this.attack = data.attack ?? data.stats[1].base_stat
    this.speed = data.speed ?? data.stats[5].base_stat
    this.types = data.types
  }

  get detailsHTMLTemplate() {
    return `
    <div
      class="border border-1 border-danger rounded text-success p-2 h-100 d-flex flex-column justify-content-between">
      <div class="border border-1 border-success rounded px-3 py-1 d-flex justify-content-between text-capitalize">
        <span>${this.name}</span>
        <span>${this.nickName}</span>
      </div>
      <div class="d-flex justify-content-center">
        <img src="${this.img}" alt="Front of ${this.name}" class="w-25">
        <img src="${this.backImg}" alt="Back of ${this.name}" class="w-25">
      </div>
      <div>
        <div class="border border-1 border-success rounded p-3">
          <div class="mb-2 d-flex gap-2">
            ${this.typeSpans}
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Health:</span>
            <span>${this.health} hp</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Attack:</span>
            <span>${this.attack} ap</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Defense:</span>
            <span>${this.defense} dp</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Speed:</span>
            <span>${this.speed} sp</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Weight:</span>
            <span>${this.weightAsPounds} lbs</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Height:</span>
            <span>${this.heightAsFeet} ft</span>
          </div>
        </div>
        ${this.sandboxButton}
      </div>
    </div>
    `
  }

  get listHTMLTemplate() {
    return `
    <li onclick="app.SandboxPokemonsController.setActivePokemon('${this.id}')" class="d-flex gap-2 align-items-center mb-1" role="button" title="See details for ${this.nickName || this.name}">
      <i class="mdi mdi-pokeball ${this.isActive ? 'mdi-spin' : ''}"></i>
      <span class="text-capitalize ${this.isActive ? 'text-light' : 'text-success'}">${this.nickName || this.name}</span>
    </li>
    `
  }


  get isActive() {
    return this.id == AppState.activePokemon?.id
  }


}