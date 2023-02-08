import React from 'react'
import { Link } from 'react-router-dom';
import '../../style/all-workspaces.css'

export default function AllWorkspaces(props: any) {
  const { allWorkSpaces } = props;

  function renderWorkspaces() {
    return allWorkSpaces.map((space: any) => {
      return (
        <Link id={space.WORKSPACE_ID} className="workspaces-link" to={`/workspace-${space.WORKSPACE_ID}`}>
          <div className="workspace-card">
            <p className="workspaces_title">{space.WORKSPACE_TITLE}</p>
            <div className="workspace_cover">
              <div className="workspaces_info">
                <p>Boards: {space.WORKSPACE_BOARDS.length}</p>
                <p>Participants: {}</p>
              </div>
            </div>
          </div>
        </Link>
      )
    })
  }

  return (
    <div className='workspaces-container'>
      <h3 className="h3-heading">Workspaces ({allWorkSpaces.length})</h3>
      <div className="workspaces-list">
        {renderWorkspaces()}
      </div>
    </div>
  )
}
