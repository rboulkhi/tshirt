const html = require('choo/html')
const css = require('sheetify')

const prefix = css`
  :host input.spinner {
    width: 3rem;
  }
  :host input.slider {
    width: 100%;
  }
`


const liMeasurement = function (measurement, index) {
  const {key, value} = measurement
  const {send} = this

  function onInput (event) {
    const value = parseFloat(event.target.value)
    if (isNaN(value)) return
    send('setMeasurement', {key, value})
  }

  return html`
  <li>
    <label>
      ${key}
      <input type="number" class="spinner"
        value="${value}"
        oninput=${onInput}
      />
      <input type="range" class="slider"
        value="${value}"
        min="0" max="200"
        step="0.125"
        oninput=${onInput}
      />
    </label>
  </li>
  `
}

const olMeasurements = function (measurements, send) {
  return html`
  <ol class="${prefix}">
    ${measurements.map(liMeasurement, {send})}
  </ol>
  `
}

module.exports = olMeasurements