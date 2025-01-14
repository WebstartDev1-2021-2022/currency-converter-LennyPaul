const inputFrom = document.querySelector("#from");
const inputTo = document.querySelector("#to");
const switchButton = document.querySelector(".switch");
const selectFromCurrencies = document.querySelector("#from-currencies");
const selectToCurrencies = document.querySelector("#to-currencies");
const submmitInput = document.querySelector('[type="submit"]');
const form = document.querySelector("form");

const allCurencies = async (args) => {
  try {
    const response = await fetch(`https://api.frankfurter.app/currencies`);
    const json = await response.json();
    if (args == "To") {
      for (const [key, value] of Object.entries(json)) {
        let tmp = document.createElement("option");
        tmp.value = key;
        tmp.text = `${value} (${key})`;
        selectToCurrencies.add(tmp, null);
      }
    } else if (args == "From") {
      for (const [key, value] of Object.entries(json)) {
        let tmp = document.createElement("option");
        tmp.value = key;
        tmp.text = `${value} (${key})`;
        selectFromCurrencies.add(tmp, null);
      }
    }
    console.log((selectToCurrencies.options[1].defaultSelected = true));
  } catch (error) {
    console.log("Error");
  }
};

const delToCurrencies = (event, element) => {
  allCurencies("To");
  for (var i = 0; i < selectFromCurrencies.length; i++) {
    if (selectFromCurrencies.options[i].value == selectToCurrencies.value) {
      selectFromCurrencies.remove(i);
    }
  }
};

const delFromCurrencies = (event) => {
  allCurencies("From");
  for (var i = 0; i < selectToCurrencies.length; i++) {
    if (selectToCurrencies.options[i].value == selectFromCurrencies.value) {
      selectToCurrencies.remove(i);
    }
  }
};

const switchCurrencies = (event) => {
  event.preventDefault();
  let tmpTo = selectToCurrencies.value;
  let tmpFrom = selectFromCurrencies.value;
  allCurencies("From");
  allCurencies("To");
  setTimeout(() => {
    selectToCurrencies.value = tmpFrom;
    selectFromCurrencies.value = tmpTo;
  }, 100);

  console.log("le bouton switch a etet cliquer");
};

const submitForm = async (event) => {
  event.preventDefault();
  const fromValue = inputFrom.value;

  if (!fromValue) {
    alert("Vous n'avez pas rentrer de valeur");
    return;
  }

  const currencyFrom = selectFromCurrencies.value;
  const currencyTo = selectToCurrencies.value;

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${fromValue}&from=${currencyFrom}&to=${currencyTo}`
    );
    const json = await response.json();

    console.log(json);
    console.log(json.rates[currencyTo]);
    const res = json.rates[currencyTo];
    console.log(currencyTo);

    inputTo.value = res;
  } catch (error) {
    console.error("Erreur dans la requete : ", error);
    alert(
      "Oups ! Une errerur est arrivée, veuillez ré-essayer ultérieurement "
    );
  }
};
allCurencies("To");
allCurencies("From");

switchButton.addEventListener("click", switchCurrencies);
form.addEventListener("submit", submitForm);
selectToCurrencies.addEventListener("change", delToCurrencies);
selectFromCurrencies.addEventListener("change", delFromCurrencies);
