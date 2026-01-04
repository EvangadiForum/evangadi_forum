import React, {useContext} from 'react'
import {AppState} from '../../App'
function Dashboard() {
  const {user} = useContext(AppState)
  return (
    <div>Dashboard { user.username }</div>
  )
}

export default Dashboard