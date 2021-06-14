class MyStore {
  #access_token = "";

  get accessToken() {
    return this.#access_token;
  }
  set accessToken(at) {
    this.#access_token = at;
  }
}

export default new MyStore();
