// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchedData = await response.json()
    const formattedData = fetchedData.teams.map(eachData => ({
      name: eachData.name,
      teamImageUrl: eachData.team_image_url,
      id: eachData.id,
    }))
    this.setState({teamsData: formattedData, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamsData} = this.state
    return (
      <ul className="team-list-items">
        {teamsData.map(teamData => (
          <TeamCard key={teamData.id} teamData={teamData} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
