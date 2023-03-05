const pageDetails = () => {
  $.ajax({
    url:
      "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
    method: "GET",
    dataType: "json",
    success: function (data) {
      renderData(data);
      handleSearchInput(data);
    },
  });
};

const createTableRow = (data) => {
  const tableRow = document.createElement("tr");
  tableRow.className = "data-row";

  const idData = document.createElement("td");
  idData.className = "column1";
  idData.innerHTML = data.id;

  const name = document.createElement("td");
  name.className = "column2";
  name.innerHTML = data.firstName;

  const lastName = document.createElement("td");
  lastName.className = "column3";
  lastName.innerHTML = data.lastName;

  const email = document.createElement("td");
  email.className = "column4";
  email.innerHTML = data.email;

  const phone = document.createElement("td");
  phone.className = "column5";
  phone.innerHTML = data.phone;

  tableRow.append(idData, name, lastName, email, phone);

  return tableRow;
};

const createDetailsHtml = (data) => {
  return `
    <p>ID: ${data.id}</p>
    <p>Name: ${data.firstName} ${data.lastName}</p>
    <p>Email: ${data.email}</p>
    <p>Phone: ${data.phone}</p>
    <p>Description: ${data.description}</p>
  `;
};

const renderData = (data) => {
  const tableDataElement = document.getElementById("table-data");
  tableDataElement.innerHTML = "";

  data.forEach((element) => {
    const tableRow = createTableRow(element);
    tableDataElement.appendChild(tableRow);

    tableRow.addEventListener("click", () => {
      const detailsElement = document.getElementById("info-wrapper");
      const detailsHtml = createDetailsHtml(element);
      detailsElement.innerHTML = detailsHtml;
    });
  });
};

const filterData = (data, searchItem) => {
  return data.filter((element) => {
    return (
      element.firstName.toLowerCase().includes(searchItem) ||
      element.lastName.toLowerCase().includes(searchItem) ||
      element.email.toLowerCase().includes(searchItem) ||
      element.phone.toLowerCase().includes(searchItem) ||
      element.address.city.toLowerCase().includes(searchItem) ||
      element.address.state.toLowerCase().includes(searchItem)
    );
  });
};

const handleSearchInput = (data) => {
  const searchBoxElement = document.getElementById("search-box");
  searchBoxElement.addEventListener("input", () => {
    const searchItem = searchBoxElement.value.toLowerCase();
    const filteredData = filterData(data, searchItem);
    renderData(filteredData);
  });
};



pageDetails();
