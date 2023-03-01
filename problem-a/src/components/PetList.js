import React from 'react'; //import React Component

export default function PetList(props) {
  let pets = props.pets || []; //handle if not provided a prop
  let petCards = pets.map((pet) => {
    return <PetCard key={pet.name} pet={pet} />;
  })

  return (
    <div>
      <h2>Dogs for Adoption</h2>
      <div className="row">
          {petCards}
      </div>
    </div>
  );
}

function PetCard(props) {
  let pet = props.pet; //shortcut
  return (
    <div className="col-4 flex-grow-1">
      <div className="card mb-3">
        <img className="card-img-top" src={pet.images[0]} alt={pet.name} />
        <div className="card-body">
          <h3 className="card-title">{pet.name}</h3>
          <p className="card-text">{pet.sex} {pet.breed}</p>
          <button className="btn btn-primary">Meet {pet.name}</button>
        </div>
      </div>
    </div>
  );
}
