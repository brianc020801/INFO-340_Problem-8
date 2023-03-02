import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PetPage(props) {
  return (
    <div>
      <p className="lead"><strong>Interested in adopting a pet?</strong> Our dogs are all <em>good boys</em>! Please consider adopting one.</p>
      <Outlet />
    </div>    
  )
}
