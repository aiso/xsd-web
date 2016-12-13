export default {
  methods: {
    promisify (val) {
      if (!val) {
        return val === false ? Promise.reject(val) : Promise.resolve(val)
      }

      if (typeof val.then === 'function') {
        return val
      }

      return Promise.resolve(val)
    }
  }
}
