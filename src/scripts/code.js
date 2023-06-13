const remote = require("electron").remote;
const path = require("path");
const {faUserCheck} = require("@fortawesome/fontawesome-free-solid");
const file_manager = remote.require(
  path.join(__dirname, "../../scripts/file_manager.js")
);

let listData = [];
let opt = '';

function save_func(event, op) {
  event.preventDefault();
  opt = op;
}

function clearFields() {
  document.getElementById("client-name").value = "";
  document.getElementById("select").value = "";
  document.getElementById("select-1").value = "";
  document.getElementById("rate").value = "0";
  document.getElementById("back-area").value = "0";
  document.getElementById("edging").value = "0";
  document.getElementById("screws").value = "0";
  document.getElementById("secondary-top").value = "0";
  file_manager
    .loadFile(path.join(__dirname, "../../db/.codes.json"))
    .then((res) => {
      const id = document.getElementById("id");
      if (res.length === 0 && listData.length === 0) {
        id.innerHTML = "1";
      } else if (listData.length === 0) {
        id.innerHTML = Number(res[res.length - 1].id) + 1;
      } else if (res.length === 0) {
        id.innerHTML = Number(listData[listData.length - 1].id) + 1;
      } else {
        id.innerHTML = Number(listData[listData.length - 1].id) + 1;
      }
    });
}

function toggle(event) {
  if (event.target.checked) {
    document.getElementById("delete-selected").disabled = false;
    document.getElementById("delete-selected-1").disabled = false;
    file_manager
      .loadFile(path.join(__dirname, "../../db/.codes.json"))
      .then((res) => {
        const data1 = res.concat(listData);
        data1.forEach((data) => {
          if (data.id === event.target.id.toString()) {
            const id = document.getElementById("id");
            document.getElementById("fieldset").disabled = true;
            document.getElementById("update").disabled = true;
            document.getElementById("save").disabled = true;
            document.getElementById("clear").disabled = true;
            document.getElementById("add").disabled = true;
            document.getElementById('edit').disabled = false
          }
        });
        file_manager
          .loadFile(path.join(__dirname, "../../db/.codes.json"))
          .then((res) => {
            let count = 0;
            const data1 = res.concat(listData);
            data1.forEach((data) => {
              if (
                document.getElementById(data.id) &&
                document.getElementById(data.id).checked
              ) {
                count += 1;
              }
            });
            if (count > 1) {
              const id = document.getElementById("id");
              clearFields();
              document.getElementById("fieldset").disabled = true;
              document.getElementById("save").disabled = true;
              document.getElementById("add").disabled = true;
              document.getElementById("update").disabled = true;
              document.getElementById("clear").disabled = true;
              document.getElementById('edit').disabled = true
            }
          });
      });
  } else {
    clearFields();
    file_manager
      .loadFile(path.join(__dirname, "../../db/.codes.json"))
      .then((res) => {
        let count = 0;
        const data1 = res.concat(listData);
        data1.forEach((data) => {
          if (
            document.getElementById(data.id) &&
            document.getElementById(data.id).checked
          ) {
            count += 1;
          }
        });
        if (count === 0) {
          clearFields();
          populateTable();
          document.getElementById("delete-selected").disabled = true;
          document.getElementById("delete-selected-1").disabled = true;
          document.getElementById("fieldset").disabled = false;
          if (listData.length === 0) {
            document.getElementById("save").disabled = true;
          } else {
            document.getElementById("save").disabled = false;
          }
          document.getElementById("update").disabled = true;
          document.getElementById("add").disabled = false;
          document.getElementById("clear").disabled = false;
          document.getElementById('edit').disabled = true
        } else if (count === 1) {
          document.getElementById("fieldset").disabled = false;
          file_manager
            .loadFile(path.join(__dirname, "../../db/.codes.json"))
            .then((res) => {
              const data1 = res.concat(listData);
              data1.forEach((data) => {
                if (
                  document.getElementById(data.id) &&
                  document.getElementById(data.id).checked
                ) {
                  const id = document.getElementById("id");
                  document.getElementById("fieldset").disabled = true;
                  document.getElementById("update").disabled = true;
                  document.getElementById('edit').disabled = false
                  document.getElementById("save").disabled = true;
                  document.getElementById("add").disabled = true;
                  document.getElementById("clear").disabled = true;
                }
              });
            });
        } else {
          document.getElementById("fieldset").disabled = true;
          document.getElementById("update").disabled = true;
          document.getElementById("save").disabled = true;
          document.getElementById("add").disabled = true;
          document.getElementById("clear").disabled = true;
          // populateTable()
        }
      });
  }
}

function edit(event){
  file_manager
      .loadFile(path.join(__dirname, "../../db/.codes.json"))
      .then((res) => {
        const data1 = res.concat(listData);
        data1.forEach((data) => {
          if (document.getElementById(data.id) &&
              document.getElementById(data.id).checked) {
            document.getElementById("fieldset").disabled = false;

            const id = document.getElementById("id");
            id.innerHTML = data.id;
            file_manager
              .loadFile(path.join(__dirname, "../../db/.types.json"))
              .then((res) => {
                const select = document.getElementById("select-1");
                select.innerHTML = "";
                let option = document.createElement("option");
                option.text = "Please Select";
                option.value = "";
                option.classList.add('d-none');
                select.add(option);
                res.forEach((dat) => {
                  if(dat.utility_id === data.utility_id)
                  {
                    let option = document.createElement("option");
                    option.text = dat.title;
                    option.value = dat.id;
                    select.add(option);
                  }
                });
                document.getElementById("select-1").value = data.type_id;
              });
            document.getElementById("client-name").value = data.title;
            document.getElementById("select").value = data.utility_id;

            document.getElementById("rate").value = data.rate;
            document.getElementById("back-area").value = data.back_area;
            document.getElementById("edging").value = data.edging;
            document.getElementById("screws").value = data.screws;
            document.getElementById("secondary-top").value = data.secondary_top;
            document.getElementById("update").disabled = false;
            document.getElementById("save").disabled = true;
            document.getElementById("clear").disabled = false;
            document.getElementById("add").disabled = true;
            document.getElementById('edit').disabled = false
          }
          })
        })
}

function populateTable() {
  document.getElementById("client-table").innerHTML = "";
  document.getElementById("delete-selected").disabled = true;
  document.getElementById("delete-selected-1").disabled = true;
  document.getElementById("update").disabled = true;
  document.getElementById("save").disabled = true;
  file_manager
    .loadFile(path.join(__dirname, "../../db/.codes.json"))
    .then((res) => {
      const id = document.getElementById("id");
      if (res.length === 0 && listData.length === 0) {
        id.innerHTML = "1";
      } else if (listData.length === 0) {
        id.innerHTML = Number(res[res.length - 1].id) + 1;
      } else if (res.length === 0) {
        id.innerHTML = Number(listData[listData.length - 1].id) + 1;
      } else {
        id.innerHTML = Number(listData[listData.length - 1].id) + 1;
      }
      const data1 = res.concat(listData);
      if (data1.length === 0) {
        document.getElementById("client-table").innerHTML = `
          <tr class="tr-shadow" style="border-bottom: 2px solid grey">
            <td style="border: 1px solid black" style="border: 1px solid black" colspan="4">No Data Added.</td>
          </tr>`;
        document.getElementById("checkbox-all-box").style.display = "none";
      } else {
        document.getElementById("checkbox-all-box").style.display = "block";
        data1.forEach((data, index) => {
          document.getElementById("client-table").innerHTML += `
          <tr class="tr-shadow" style="border-bottom: 2px solid grey">
            <td style="border: 1px solid black" style="border: 1px solid black">
              <label class="au-checkbox">
                <input type="checkbox" id="${data.id}" onchange="toggle(event)">
                <span class="au-checkmark" style="border: 1px solid green"></span>
              </label>
            </td>
            <td style="border: 1px solid black">${data.id}</td>
            <td style="border: 1px solid black">${data.title}</td>
            <td style="border: 1px solid black">${data.rate}</td>
            <td style="border: 1px solid black">${data.back_area}</td>
            <td style="border: 1px solid black">${data.secondary_top}</td>
            <td style="border: 1px solid black">${data.edging}</td>
            <td style="border: 1px solid black">${data.screws}</td>
          </tr>`;
        });
      }
    });
  file_manager
    .loadFile(path.join(__dirname, "../../db/.utilities.json"))
    .then((res) => {
      const select = document.getElementById("select");
      select.innerHTML = "";
      let option = document.createElement("option");
      option.text = "Please Select";
      option.value = "";
      option.classList.add('d-none');
      select.add(option);
      res.forEach((data) => {
        let option = document.createElement("option");
        option.text = data.title;
        option.value = data.id;
        select.add(option);
      });
    });
  const select = document.getElementById("select-1");
  select.innerHTML = "";
  let option = document.createElement("option");
  option.text = "Please Select";
  option.value = "";
  option.classList.add('d-none');
  select.add(option);

}

$(document).ready(() => {
  populateTable();
});

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = document.getElementById("id").innerHTML;
  const name = document.getElementById("client-name").value;
  const select = document.getElementById("select");
  const select_1 = document.getElementById("select-1");
  const value = select.value;
  const text = select.options[select.selectedIndex].text;
  const value1 = select_1.value;
  const text1 = select_1.options[select_1.selectedIndex].text;
  const rate = document.getElementById("rate").value;
  const back_area =  document.getElementById("back-area").value;
  const edging = document.getElementById("edging").value;
  const screws = document.getElementById("screws").value;
  const secondary_top = document.getElementById("secondary-top").value;
  const data = {
    id: id,
    title: name,
    rate: rate,
    back_area: back_area,
    edging: edging,
    screws: screws,
    secondary_top: secondary_top,
    utility_id: value,
    utility: text,
    type_id: value1,
    type: text1,
  }; 
  listData.push(data);
  file_manager
    .loadFile(path.join(__dirname, "../../db/.codes.json"))
    .then((res) => {
      if (res.length === 0 && listData.length === 1) {
        document.getElementById("client-table").innerHTML = "";
      }
      clearFields();
      populateTable();
      if (listData.length === 0) {
        document.getElementById("save").disabled = true;
      } else {
        document.getElementById("save").disabled = false;
      }
    });
});

document.getElementById("clear").addEventListener("click", (event) => {
  event.preventDefault();
  clearFields();
  populateTable();
  document.getElementById("add").disabled = false;
  document.getElementById("edit").disabled = true;
});

document.getElementById('cancel').addEventListener('click', (event) => {
  event.preventDefault();
  document.getElementById('pass').value = '';
})

document.getElementById("confirm").addEventListener("click", (event) => {
  event.preventDefault();
  let dd = {}
  const select = document.getElementById("select");
  dd.utility_id = select.value;
  dd.utility = select.options[select.selectedIndex].text;
  const select_1 = document.getElementById("select-1");
  dd.type_id = select_1.value;
  dd.type = select_1.options[select_1.selectedIndex].text;
  file_manager
    .loadFile(path.join(__dirname, "../../db/.credentials.json"))
    .then((res) => {
      if(opt === 'save')
      {
        if(res[0].password === document.getElementById('pass').value)
        {
          file_manager
              .loadFile(path.join(__dirname, "../../db/.codes.json"))
              .then((res) => {
                const clients = res;
                listData.forEach((r) => {
                  clients.push(r);
                });

                file_manager
                    .writeFile(
                        path.join(__dirname, "../../db/.codes.json"),
                        clients
                    )
                    .then((res) => {
                      if (res === "success") {
                        alert("Saved Successfully!");
                        document.getElementById("cancel").click();
                        document.getElementById("pass").value = "";
                        listData = [];
                        document.getElementById("save").disabled = true;
                        populateTable();
                      } else {
                        alert("Could Not Saved!");
                        document.getElementById("cancel").click();
                        document.getElementById("pass").value = "";
                      }
                    });
              });
        }
        else
        {
          alert("Password Not Matched!");
          document.getElementById("cancel").click();
          document.getElementById("pass").value = "";
        }
      }
      else if (opt === 'update')
      {
        if(document.getElementById('select').value.trim().length !== 0 &&
            document.getElementById('select-1').value.trim().length !== 0 &&
            document.getElementById('client-name').value.trim().length !== 0 &&
            document.getElementById('rate').value.trim().length !== 0 &&
            parseFloat(document.getElementById('rate').value) > 0 &&  
            document.getElementById("back-area").value.trim().length !== 0 &&
            document.getElementById("edging").value.trim().length !== 0 &&
            document.getElementById("screws").value.trim().length !== 0 &&
            document.getElementById("secondary-top").value.trim().length !== 0 )
        {
          if(res[1].pass === document.getElementById('pass').value)
          {
            file_manager
                .loadFile(path.join(__dirname, "../../db/.codes.json"))
                .then((res) => {
                  res.forEach((d) => {
                    if (d.id === document.getElementById("id").innerHTML) {
                      d.title = document.getElementById("client-name").value;
                      d.utility_id = dd.utility_id;
                      d.utility = dd.utility;
                      d.type_id = dd.type_id;
                      d.type = dd.type
                      d.rate = document.getElementById("rate").value;
                      d.back_area = document.getElementById("back-area").value;
                      d.edging = document.getElementById("edging").value;
                      d.screws = document.getElementById("screws").value;
                      d.secondary_top = document.getElementById("secondary-top").value;
                    }
                  });
                  file_manager
                      .writeFile(path.join(__dirname, "../../db/.codes.json"), res)
                      .then((res) => {
                        document.getElementById('edit').disabled = true;
                        populateTable();
                        clearFields();
                        if (listData.length === 0) {
                          document.getElementById("save").disabled = true;
                        } else {
                          document.getElementById("save").disabled = false;
                        }
                        document.getElementById("add").disabled = false;
                      });
                });
            listData.forEach((d) => {
              if (d.id === document.getElementById("id").innerHTML) {
                d.title = document.getElementById("client-name").value;
                d.utility_id = dd.utility_id;
                d.utility = dd.utility;
                d.type_id = dd.type_id;
                d.type = dd.type
                d.rate = document.getElementById("rate").value;
                d.back_area = document.getElementById("back-area").value;
                d.edging = document.getElementById("edging").value;
                d.screws = document.getElementById("screws").value;
                d.secondary_top = document.getElementById("secondary-top").value;
              }
            });
            populateTable();
            document.getElementById("cancel").click();
            document.getElementById("pass").value = "";
          }
          else
          {
            alert("Password Not Matched!");
            document.getElementById("cancel").click();
            document.getElementById("pass").value = "";
          }
        }
        else {
          alert("Incomplete Data! Please fill all fields.")
          document.getElementById('cancel').click();
        }

      }
      else
      {
        if(res[1].pass === document.getElementById('pass').value)
        {
          del();
          document.getElementById('cancel').click();
        }
        else
        {
          alert("Password Not Matched!");
          document.getElementById("cancel").click();
          document.getElementById("pass").value = "";
        }
      }
    });
});

document.getElementById("checkbox-all").addEventListener("change", (event) => {
  if (event.target.checked) {
    file_manager
      .loadFile(path.join(__dirname, "../../db/.codes.json"))
      .then((res) => {
        const data = res.concat(listData);
        data.forEach((i) => {
          const tag = document.getElementById(i.id);
          if (tag && !tag.checked) {
            tag.click();
          }
        });
      });
    document.getElementById("delete-selected").disabled = false;
    document.getElementById("delete-selected-1").disabled = false;
    document.getElementById("fieldset").disabled = true;
    document.getElementById("save").disabled = true;
    document.getElementById("clear").disabled = true;
    document.getElementById("update").disabled = true;
    document.getElementById("add").disabled = true;
    clearFields();
  } else {
    file_manager
      .loadFile(path.join(__dirname, "../../db/.codes.json"))
      .then((res) => {
        const data = res.concat(listData);
        data.forEach((i) => {
          const tag = document.getElementById(i.id);
          if (tag && tag.checked) {
            tag.click();
          }
        });
      });
    clearFields();
    populateTable();
    document.getElementById("delete-selected").disabled = true;
    document.getElementById("delete-selected-1").disabled = true;
    document.getElementById("fieldset").disabled = false;
    if (listData.length === 0) {
      document.getElementById("save").disabled = true;
    } else {
      document.getElementById("save").disabled = false;
    }
    document.getElementById("clear").disabled = false;
    document.getElementById("update").disabled = true;
    document.getElementById("add").disabled = false;
  }
});

document.getElementById("selectUtil").addEventListener("click", (event) => {
  document.getElementById("select").value = "";
  document.getElementById("select-1").innerHTML = ''
  if(document.getElementById('checkbox-all').checked)
    document.getElementById('checkbox-all').checked = false
  document.getElementById('delete-selected-1').disabled = true
  document.getElementById('edit').disabled = true
  filter_by_dropdown(document.getElementById("select-1").value,'');

});

document.getElementById("selectTyp").addEventListener("click", (event) => {
  document.getElementById("select-1").value = "";
  if(document.getElementById('checkbox-all').checked)
    document.getElementById('checkbox-all').checked = false
  document.getElementById('delete-selected-1').disabled = true
  document.getElementById('edit').disabled = true
  filter_by_dropdown_1(document.getElementById("select").value,'');
});

function del_from_other(selected) {
  file_manager
    .loadFile(path.join(__dirname, "../../db/.doors.json"))
    .then((res) => {
      res.forEach((d) => {
        selected.forEach((i) => {
          res = res.filter((item) => item.code_id !== i.id);
        });
      });
      file_manager
        .writeFile(path.join(__dirname, "../../db/.doors.json"), res)
        .then((res) => {});
    });

  file_manager
    .loadFile(path.join(__dirname, "../../db/.hardwares.json"))
    .then((res) => {
      res.forEach((d) => {
        selected.forEach((i) => {
          res = res.filter((item) => item.code_id !== i.id);
        });
      });
      file_manager
        .writeFile(path.join(__dirname, "../../db/.hardwares.json"), res)
        .then((res) => {});
    });

  file_manager
    .loadFile(path.join(__dirname, "../../db/.handlers.json"))
    .then((res) => {
      res.forEach((d) => {
        selected.forEach((i) => {
          res = res.filter((item) => item.code_id !== i.id);
        });
      });
      file_manager
        .writeFile(path.join(__dirname, "../../db/.handlers.json"), res)
        .then((res) => {});
    });

  file_manager
    .loadFile(path.join(__dirname, "../../db/.shelves.json"))
    .then((res) => {
      res.forEach((d) => {
        selected.forEach((i) => {
          res = res.filter((item) => item.code_id !== i.id);
        });
      });
      file_manager
        .writeFile(path.join(__dirname, "../../db/.shelves.json"), res)
        .then((res) => {});
    });
}

function del() {
  const selected = [];

  file_manager
    .loadFile(path.join(__dirname, "../../db/.codes.json"))
    .then((res) => {
      res.forEach((data) => {
        if (
          document.getElementById(data.id) &&
          document.getElementById(data.id).checked
        ) {
          selected.push(data);
        }
      });
      res = res.filter(function (el) {
        return !selected.includes(el);
      });
      file_manager
        .writeFile(path.join(__dirname, "../../db/.codes.json"), res)
        .then((res) => {
          if (res === "success") {
            document.getElementById('edit').disabled = true
            alert("Deleted Successfully!");
            const selected1 = [];

            listData.forEach((data) => {
              if (
                document.getElementById(data.id) &&
                document.getElementById(data.id).checked
              ) {
                selected1.push(data);
              }
            });
            if (selected1.length > 0) {
              listData = listData.filter(function (el) {
                return !selected1.includes(el);
              });
            }
            const s = selected.concat(selected1);
            del_from_other(s);
            clearFields();
            populateTable();
            if (document.getElementById("checkbox-all").checked)
              document.getElementById("checkbox-all").click();
            document.getElementById("fieldset").disabled = false;
            document.getElementById("add").disabled = false;
            document.getElementById("save").disabled = false;
            document.getElementById("clear").disabled = false;
            if (listData.length === 0) {
              document.getElementById("save").disabled = true;
            } else {
              document.getElementById("save").disabled = false;
            }
          }
        });
    });
}


document.getElementById("select").addEventListener("change", (event) => {
  event.preventDefault();
  filter_by_dropdown(
    document.getElementById("select-1").value, document.getElementById("select").value
  );
  file_manager
    .loadFile(path.join(__dirname, "../../db/.types.json"))
    .then((res) => {
      const select = document.getElementById("select-1");
      select.innerHTML = "";
      let option = document.createElement("option");
      option.text = "Please Select";
      option.value = "";
      option.classList.add('d-none');
      select.add(option);
      res.forEach((data) => {
        let option = document.createElement("option");
        option.text = data.title;
        option.value = data.id;
        if (event.target.value === "" || data.utility_id === event.target.value)
          select.add(option);
      });
    });
});

document.getElementById("select-1").addEventListener("change", (event) => {
  event.preventDefault();
  filter_by_dropdown_1(
      document.getElementById("select").value,
      document.getElementById("select-1").value
  );
});

function filter(query) {
  file_manager
    .loadFile(path.join(__dirname, "../../db/.codes.json"))
    .then((res) => {
      const result = [];
      const data1 = res.concat(listData);
      data1.forEach((data) => {
        if (
          data.id.includes(query) ||
          data.title.toLowerCase().includes(query.toLowerCase())
        ) {
          result.push(data);
        }
      });
      document.getElementById("client-table").innerHTML = "";
      result.forEach((data, index) => {
        document.getElementById("client-table").innerHTML += `
          <tr class="tr-shadow" style="border-bottom: 2px solid grey">
            <td style="border: 1px solid black">
              <label class="au-checkbox">
                <input type="checkbox" id="${data.id}" onchange="toggle(event)">
                <span class="au-checkmark" style="border: 1px solid green"></span>
              </label>
            </td>
            <td style="border: 1px solid black">${data.id}</td>
            <td style="border: 1px solid black">${data.title}</td>
            <td style="border: 1px solid black">${data.rate}</td>
            <td style="border: 1px solid black">${data.back_area}</td>
            <td style="border: 1px solid black">${data.secondary_top}</td>
            <td style="border: 1px solid black">${data.edging}</td>
            <td style="border: 1px solid black">${data.screws}</td>
          </tr>`;
      });
    });
}

function filter_by_dropdown(query, query1) {
  file_manager
    .loadFile(path.join(__dirname, "../../db/.codes.json"))
    .then((res) => {
      let result = [];
      let result1 = [];
      const data1 = res.concat(listData);
      if(query !== "")
      {
        data1.forEach((data) => {
          if (data.type_id === query) {
            result.push(data);
          }
        });
      }
      else
      {
        result = data1
      }
      if(query1 !== "")
      {
        result.forEach((data) => {
          if (data.utility_id === query1) {
            result1.push(data);
          }
        });
      }
      else {
        result1 = result;
      }

      document.getElementById("client-table").innerHTML = "";
      result1.forEach((data, index) => {
        document.getElementById("client-table").innerHTML += `
          <tr class="tr-shadow" style="border-bottom: 2px solid grey">
            <td style="border: 1px solid black">
              <label class="au-checkbox">
                <input type="checkbox" id="${data.id}" onchange="toggle(event)">
                <span class="au-checkmark" style="border: 1px solid green"></span>
              </label>
            </td>
            <td style="border: 1px solid black">${data.id}</td>
            <td style="border: 1px solid black">${data.title}</td>
            <td style="border: 1px solid black">${data.rate}</td>
            <td style="border: 1px solid black">${data.back_area}</td>
            <td style="border: 1px solid black">${data.secondary_top}</td>
            <td style="border: 1px solid black">${data.edging}</td>
            <td style="border: 1px solid black">${data.screws}</td>
          </tr>`;
      });
    });
}

function filter_by_dropdown_1(query, query1) {
  file_manager
    .loadFile(path.join(__dirname, "../../db/.codes.json"))
    .then((res) => {
      let result = [];
      let result1 = [];
      const data1 = res.concat(listData);
      if(query !== "")
      {
        data1.forEach((data) => {
          if (data.utility_id === query) {
            result.push(data);
          }
        });
      }
      else {
        result = data1;
      }
      if(query1!=="")
      {
        result.forEach((data) => {
          if (data.type_id === query1) {
            result1.push(data);
          }
        });
      }
      else {
        result1 = result;
      }

      document.getElementById("client-table").innerHTML = "";
      result1.forEach((data, index) => {
        document.getElementById("client-table").innerHTML += `
          <tr class="tr-shadow" style="border-bottom: 2px solid grey">
            <td style="border: 1px solid black">
              <label class="au-checkbox">
                <input type="checkbox" id="${data.id}" onchange="toggle(event)">
                <span class="au-checkmark" style="border: 1px solid green"></span>
              </label>
            </td>
            <td style="border: 1px solid black">${data.id}</td>
            <td style="border: 1px solid black">${data.title}</td>
            <td style="border: 1px solid black">${data.rate}</td>
            <td style="border: 1px solid black">${data.back_area}</td>
            <td style="border: 1px solid black">${data.secondary_top}</td>
            <td style="border: 1px solid black">${data.edging}</td>
            <td style="border: 1px solid black">${data.screws}</td>
          </tr>`;
      });
    });
}

document.getElementById("search").addEventListener("keypress", (event) => {
  filter(event.target.value);
});

document.getElementById("search").addEventListener("keydown", (event) => {
  if (event.target.value !== "") {
    filter(event.target.value);
  } else {
    populateTable();
  }
});

document.getElementById("search").addEventListener("keyup", (event) => {
  filter(event.target.value);
});
