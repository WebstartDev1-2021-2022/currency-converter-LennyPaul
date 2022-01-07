const inputFrom = document.querySelector("#from");
const inputTo = document.querySelector("#to");
const switchButton = document.querySelector(".switch");
const selectFromCurrencies = document.querySelector("#from-currencies");
const selectToCurrencies = document.querySelector("#to-currencies");
const submmitInput = document.querySelector('[type="submit"]');
const form = document.querySelector("form");

const delToCurrencies = (event) => {
  for (var i = 0; i < selectToCurrencies.length; i++) {
    if (selectToCurrencies.options[i].value == selectFromCurrencies.value)
      selectToCurrencies.options[i].style.display = "none";
  }
};

const delFromCurrencies = (event) => {
  for (var i = 0; i < selectFromCurrencies.length; i++) {
    if (selectFromCurrencies.options[i].value == selectToCurrencies.value)
      selectFromCurrencies.options[i].style.display = "none";
  }
};

const switchCurrencies = (event) => {
  event.preventDefault();
  tmp = selectToCurrencies.value;
  selectToCurrencies.value = selectFromCurrencies.value;
  selectFromCurrencies.value = tmp;

  console.log(selectToCurrencies.value);
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
    document.get;

    document.getElementById("to").value = res;
  } catch (error) {
    console.error("Erreur dans la requete : ", error);
    alert(
      "Oups ! Une errerur est arrivée, veuillez ré-essayer ultérieurement "
    );
  }
};
delToCurrencies();
delFromCurrencies();

switchButton.addEventListener("click", switchCurrencies);
form.addEventListener("submit", submitForm);
selectToCurrencies.addEventListener("click", delToCurrencies);
selectFromCurrencies.addEventListener("click", delFromCurrencies);
