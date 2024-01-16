export default class AviaSalesService {
  _apiBase = 'https://aviasales-test-api.kata.academy'

  async requestId() {
    const res = await fetch(`${this._apiBase}/search`)
    if (!res.ok) {
      throw new Error(`Couldnt fetch${this._apiBase} received ${res.status}`)
    }
    return await res.json()
  }

  async requestPage(key) {
    const res = await fetch(`${this._apiBase}/tickets?searchId=${key}`)
    if (!res.ok) {
      throw new Error(`Couldnt fetch${this._apiBase} received ${res.status}`)
    }
    return await res.json()
  }
  async requestAllPages() {
    const pagesArr = []
    const { searchId } = await this.requestId()
    for (let i = 0; i < 7; i++) {
      const page = await this.requestPage(searchId)
      pagesArr.push(page.tickets)
    }
    return pagesArr
  }
}
