const
  {Arg} = require('api-dialect'),
  models = require('../../models').models,
  fs = require('fs'),
  path = require('path')

let container = {}

Object.keys(models).forEach(key => {
  container[key] = Arg.factory(models[key])
})

for (let k in container) {
  let v = container[k]
  let template = {}

  v.forEach(i => {
    template[i.name] = 'test'
  })
  template = JSON.stringify(template, null, 2)

  fs.writeFileSync(path.join(__dirname, `${k}.json`), template)
}

console.log('done')
