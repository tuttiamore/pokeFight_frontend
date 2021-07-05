const getPokemonFight = useCallback(() => {
  console.log("getPokemonFight called");

  const pokeFight = setInterval(() => {
    // Game logic: 1. pick attacker
    const players = [pokemonPlayerOne, pokemonPlayerTwo];
    const attackerRandom = Math.floor(Math.random() * 2);
    const attacker = players.find((player, index) => index === attackerRandom);
    const defendant = players.find((player, index) => index !== attackerRandom);
    console.log(
      `attacker is ${attacker.name.english} with ${attacker.base.HP} HP `
    );
    console.log(
      `defendant is ${defendant.name.english} with ${defendant.base.HP} HP`
    );
    // 2. randomly pick from normal or special attack
    const attackDefenses = [
      {
        attack: "Attack",
        defense: "Defense",
      },
      {
        attack: "Sp. Attack",
        defense: "Sp. Defense",
      },
    ];
    const attackRandom = Math.floor(Math.random() * 2);
    const attack = attackDefenses.find(
      (attack, index) => index === attackRandom
    );

    // 3. compare with defend of defendant, if attacker wins, substract diff from HP
    const damage =
      attacker.base[attack.attack] - defendant.base[attack.defense];

    console.log(`attacker was ${attack.attack},causing ${damage} damage`);

    if (damage > 0) {
      defendant.base.HP -= damage;
      console.log(`defedant HP after attack is ${defendant.base.HP} `);

      if (defendant.name.english === pokemonPlayerOne.name.english) {
        setPokemonPlayerOne("buh");
      } else {
        setPokemonPlayerTwo(defendant);
      }
    }

    // If speed of defendant superior, make attack randomly fail
  }, 5000);
  return () => clearInterval(pokeFight);
}, [pokemonPlayerOne, pokemonPlayerTwo]);

useEffect(() => {
  console.log("get pokemon fight");
  if (isFighting) {
    getPokemonFight();
  }
}, [getPokemonFight, isFighting]);
