var createOlympian = function () {
  return {
    name: function (input) {
      this.nameStr = input;
      return this;
    },
    nameStr: '',
    sport: function (input) {
      this.sportStr = input;
      return this;
    },
    sportStr: '',
    country: function (input) {
      this.countryStr = input;
      return this;
    },
    countryStr: '',

    log: function () {
      var data = '';
      if (this.nameStr === 0 ||
          this.nameStr === false ||
          this.nameStr === '' ||
          this.nameStr === "" ||
          this.nameStr === null ||
          this.nameStr === undefined ||
          !isNaN(this.nameStr)) {
            // don't return name
      } else {
        data = data.concat(this.nameStr);
      }

      if (this.sportStr === 0 ||
          this.sportStr === false ||
          this.sportStr === '' ||
          this.sportStr === "" ||
          this.sportStr === null ||
          this.sportStr === undefined ||
          !isNaN(this.sportStr)) {
            // don't return sport
      } else {
        if (data.length === 0) {
          data = data.concat(this.sportsStr);
        } else {
          data = data.concat(', ' + this.sportStr);
        }
      }

      if (this.countryStr === 0 ||
          this.countryStr === false ||
          this.countryStr === '' ||
          this.countryStr === "" ||
          this.countryStr === null ||
          this.countryStr === undefined ||
          !isNaN(this.countryStr)) {
            // don't return country
      } else {
        if (data.length === 0) {
          data = data.concat(this.countryStr);
        } else {
          data = data.concat(', ' + this.countryStr);
        }
      }

      if (data.length === 0) {
        console.log('No data for this athlete.');
      }

      console.log(data);
      return this;
    }
  }
}

createOlympian().name('Katie Ledecky').sport('Swimming').country('USA').log()
// Katie Ledecky, Swimming, USA

createOlympian().sport('Tennis').name('Serena Williams').log().country('USA').log()
// Serena Williams, Tennis
// Serena Williams, Tennis, USA

createOlympian().log().name('Usain Bolt').sport('Sprinting').country('Jamaica').log().name(null).log().sport(undefined).log().country('').log()
// No data for this athlete.
// Usain Bolt, Sprinting, Jamaica
// Sprinting, Jamaica
// Jamaica
// No data for this athlete.
