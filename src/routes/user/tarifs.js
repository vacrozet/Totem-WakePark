import React, { Component } from 'react'
import { Accordion, Panel } from 'react-bootstrap'
import '../../css/tarifs.css'

class Tarifs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeKey: '1'
    }
  }

  handleChange (evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render () {
    return (
      <div>
        <Accordion defaultActiveKey={this.state.activeKey}>
          <Panel bsStyle='primary' header='Forfaits Libres' eventKey='1'>
            <center>
              <table>
                <tbody>
                  <tr>
                    <th>Forfait</th>
                    <th>Adulue</th>
                    <th>Enfant (-16ans)</th>
                  </tr>
                  <tr>
                    <th>1 Heure</th>
                    <td>20 Euros</td>
                    <td>18 Euros</td>
                  </tr>
                  <tr>
                    <th>2 Heures</th>
                    <td>34 Euros</td>
                    <td>30 Euros</td>
                  </tr>
                  <tr>
                    <th>4 Heures</th>
                    <td>45 Euros</td>
                    <td>40 Euros</td>
                  </tr>
                  <tr>
                    <th>Journée</th>
                    <td>58 Euros</td>
                    <td>52 Euros</td>
                  </tr>
                  <tr>
                    <th>Week-end</th>
                    <td>86 Euros</td>
                    <td>78 Euros</td>
                  </tr>
                  <tr>
                    <th>Semaine</th>
                    <td>168 Euros</td>
                    <td>148 Euros</td>
                  </tr>
                </tbody>
              </table>
              <article>
                *** Les modules (obstacles) sont exclusivement réservés à la pratique sportive.<br />
                Pour cela, vous devez avoir été autorisé par notre personnel et être muni d’un matériel approprié (casque, gilet, planche).<br />
                Une licence FFNSW ou WWA est vivement conseillée.<br />
                Matériel inclus : gilet de sécurité, bi-skis, kneeboard, mono, disque – Matériel en option : voir <p onClick={this.handleSelect.bind(this)}>“location de matériel”</p>
              </article>
            </center>
          </Panel>
          <Panel bsStyle='primary' header='Les Carnets' eventKey='2'>
            <center>
              <table>
                <tbody>
                  <tr>
                    <th>FORFAIT</th>
                    <th>ADULTE</th>
                    <th>ENFANT (-16ans)</th>
                  </tr>
                  <tr>
                    <th>10H Non Consécutives</th>
                    <td>180 Euros</td>
                    <td>165 Euros</td>
                  </tr>
                  <tr>
                    <th>20H Non Consécutives</th>
                    <td>320 Euros</td>
                    <td>280 Euros</td>
                  </tr>
                </tbody>
              </table>
            </center>
          </Panel>
          <Panel bsStyle='primary' header='Les Cartes Saison' eventKey='3'>
            <center>
              <table>
                <tbody>
                  <tr>
                    <th>FORFAIT - SAISON</th>
                    <th>ADULTE</th>
                    <th>ENFANT (-16ans)</th>
                  </tr>
                  <tr>
                    <th>Pratique illimitée aux horaires d'ouverture au public (materiels non inclus)</th>
                    <td>640 Euros</td>
                    <td>580 Euros</td>
                  </tr>
                </tbody>
              </table>
            </center>
          </Panel>
          <Panel bsStyle='primary' header='Location' eventKey='4'>
            <center>
              <table>
                <tbody>
                  <tr>
                    <th>LOCATION</th>
                    <th>Wakeboard<br />Wakeskate <br />(pour modules)<br /></th>
                    <th>Combinaison de néoprène</th>
                  </tr>
                  <tr>
                    <th>2 Heures</th>
                    <td>8 Euros</td>
                    <td>5 Euros</td>
                  </tr>
                  <tr>
                    <th>L'après-midi</th>
                    <td>15 Euros</td>
                    <td>8 Euros</td>
                  </tr>
                </tbody>
              </table>
            </center>
          </Panel>
        </Accordion>

      </div>
    )
  }
}

export default Tarifs
