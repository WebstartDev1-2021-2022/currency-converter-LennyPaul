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
    let HTMLcontent;
    for (const [key, value] of Object.entries(json)) {
      const option = `<option value ="${key}" >${value} (${key})</option>`;
      HTMLcontent += option;
    }
    selectToCurrencies.innerHTML = HTMLcontent;
    selectFromCurrencies.innerHTML = HTMLcontent;

    selectToCurrencies.options[1].defaultSelected = true;
    selectToCurrencies.options[0].disabled = "disabled";
    selectFromCurrencies.options[1].disabled = "disabled";
  } catch (error) {
    console.log("Error");
  }
};

const delToCurrencies = (event) => {
  for (var i = 0; i < selectFromCurrencies.length; i++) {
    selectFromCurrencies.options[i].disabled = false;
    if (selectFromCurrencies.options[i].value == selectToCurrencies.value) {
      selectFromCurrencies.options[i].disabled = true;
    }
  }
};

const delFromCurrencies = (event) => {
  for (var i = 0; i < selectToCurrencies.length; i++) {
    selectToCurrencies.options[i].disabled = false;
    if (selectToCurrencies.options[i].value == selectFromCurrencies.value) {
      selectToCurrencies.options[i].disabled = true;
    }
  }
};

const switchCurrencies = (event) => {
  event.preventDefault();
  let tmpTo = selectToCurrencies.value;
  let tmpFrom = selectFromCurrencies.value;

  setTimeout(() => {
    selectToCurrencies.value = tmpFrom;
    selectFromCurrencies.value = tmpTo;
    delToCurrencies();
    delFromCurrencies();
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
allCurencies();

switchButton.addEventListener("click", switchCurrencies);
form.addEventListener("submit", submitForm);
selectToCurrencies.addEventListener("change", delToCurrencies);
selectFromCurrencies.addEventListener("change", delFromCurrencies);
