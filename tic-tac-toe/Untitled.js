const isHumanoidVictorious = board => {
  const row1 = board.boxes.slice(0,3);
  const row2 = board.boxes.slice(3, 6);
  const row3 = board.boxes.slice(6, 9);
  const rows = [row1, row2, row3];

  const columns1 = board.boxes.filter(box => {
    return box === 0 || box % 3 === 0 ;
  });

  console.log('columns1', columns1);
}
