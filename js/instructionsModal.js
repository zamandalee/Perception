function instructionsModal(option) {

  const instructions = option === "makeVisible" ?
    document.getElementById( "hidden-instructions" ) :
    document.getElementById( "instructions-modal" );

  const blackout = option === "makeVisible" ?
    document.getElementById( "hidden-blackout" ) :
    document.getElementById( "instructions-blackout" );

  if( option === "makeVisible" ) {
    instructions.setAttribute( "id", "instructions-modal" );
    blackout.setAttribute( "id", "instructions-blackout" );
  }
  else {
    if( instructions && blackout ) {
      instructions.setAttribute( "id", "hidden-instructions" );
      blackout.setAttribute( "id", "hidden-blackout" );
    }
  }
}
