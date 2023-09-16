function main() {
  var step = {
      heading: [
        "Personal info",
        "Select your plan",
        "Pick add-ons",
        "Finishing up",
        "Thank you!",
      ],
      about: [
        "Please provide your name, email address, and phone number.",
        "You have the option of monthly or yearly billing.",
        "Add-ons help enhance your gaming experience.",
        "Double-check everything looks OK before confirming.",
        "Thanks for confirming your subscription! We hope you have fun using our \
    platform. If you ever need support, please feel free to email us at support@loremgaming.com.",
      ],
      input: [
        {
          label: ["Name", "Email Address", "Phone Number"],
          holder: [
            "e.g. Stephen King",
            "e.g. stephenking@lorem.com",
            "e.g. +1 234 567 890",
          ],
          error: "This field is required",
        },
        {
          imgName: ["icon-arcade.svg", "icon-advanced.svg", "icon-pro.svg"],
          plan: ["Arcade", "advanced", "Pro"],
          pricing: [9, 12, 15],
          interval: ["Monthly", "Yearly"],
        },
        {
          addon: ["Online service", "Larger storage", "Customizable Profile"],
          about: [
            "Access to multiplayer games",
            "Extra 1TB of cloud save",
            "Custom theme on your profile",
          ],
          pricing: [1, 2, 2],
        },
      ],
    },
    imgFolder = "assets/images/",
    info = document.getElementById("info"),
    plan = document.getElementById("plan"),
    addons = document.getElementById("addons"),
    summary = document.getElementById("summary"),
    stepsAll = document.getElementsByClassName("step"),
    data = document.getElementsByClassName("data")[0],
    back = document.getElementsByClassName("back")[0],
    next = document.getElementsByClassName("next")[0],
    stepInfo = document.createElement("div"),
    heading = document.createElement("h2"),
    about = document.createElement("p"),
    inputs = document.createElement("div");

  stepInfo.className = "step-info";
  heading.className = "heading";
  about.className = "about";
  inputs.className = "inputs";

  var stepActive = 1,
    step1chosen = ["", "", ""],
    planChosen = "Arcade",
    intervalChosen = "mo",
    addonsChosen = [true, true, false];
  step1chosen.length = 3;
  function active(num) {
    Array.from(stepsAll).forEach((elt) => {
      elt.classList.remove("active");
      elt.ariaExpanded = false;
    });
    if (num > 4) num = 4;
    stepsAll[--num].classList.remove("disabled");
    stepsAll[num].classList.add("active");
    stepsAll[num].ariaExpanded = true;
  }
  function appendElements() {
    stepInfo.appendChild(heading);
    stepInfo.appendChild(about);
    data.appendChild(stepInfo);
    data.appendChild(inputs);
    inputs.innerHTML = "";
  }
  function addText(stepNum) {
    heading.innerHTML = step.heading[--stepNum];
    about.innerHTML = step.about[stepNum];
  }

  function runStep(num) {
    num < 1 ? (num = 1) : num > 5 ? (num = 5) : (num = num);
    var step1 = "";
    if (num == 2) {
      Array.from(document.querySelectorAll(".inp")).forEach((v) => {
        if (v.value.trim() == "") {
          v.parentElement.classList.add("empty");
        } else {
          v.parentElement.classList.remove("empty");
          step1 += "1";
        }
      });
      if (
        step1chosen[0] != "" &&
        step1chosen[1] != "" &&
        step1chosen[2] != ""
      ) {
        step1 = "111";
      }
      if (step1 != "111") {
        --stepActive;
        return false;
      }
    }
    active(num);
    data.innerHTML = "";
    appendElements();
    addText(num);
    if (stepActive > 1) {
      back.classList.remove("hidden");
      back.classList.remove("disabled");
      back.ariaDisabled = false;
    } else {
      back.classList.add("hidden");
      back.classList.add("disabled");
      back.ariaDisabled = true;
    }
    function pageHeight() {
      if (num == 2 && intervalChosen == "yr") {
        document.querySelector(".page").classList.add("new");
      } else document.querySelector(".page").classList.remove("new");
    }
    pageHeight();
    if (num == 4) {
      next.innerHTML = "Confirm";
    } else next.innerHTML = "Next Step";

    return num == 1
      ? (function () {
          for (var i = 0; i < step.input[0].label.length; i++) {
            var box = document.createElement("div"),
              box2 = document.createElement("div"),
              label = document.createElement("label"),
              span = document.createElement("span"),
              inp = document.createElement("input");
            box.className = "inp-box box".concat(i + 1);
            box2.className = "between";
            label.className = "label";
            label.innerHTML = step.input[0].label[i];
            span.className = "error";
            span.innerHTML = step.input[0].error;
            inp.className = "inp";
            inp.id = "inp".concat(i + 1);
            inp.value = step1chosen[i];
            inp.placeholder = step.input[0].holder[i];
            inp.type = "text";
            label.htmlFor = inp.id;
            box2.appendChild(label);
            box2.appendChild(span);
            box.appendChild(box2);
            box.appendChild(inp);
            data.appendChild(box);
          }
          document.querySelectorAll(".inp")[0].onblur = function () {
            step1chosen[0] = document.querySelectorAll(".inp")[0].value;
          };
          document.querySelectorAll(".inp")[1].onblur = function () {
            step1chosen[1] = document.querySelectorAll(".inp")[1].value;
          };
          document.querySelectorAll(".inp")[2].onblur = function () {
            step1chosen[2] = document.querySelectorAll(".inp")[2].value;
          };
        })()
      : num == 2
      ? (function () {
          var plans = document.createElement("div"),
            interval = document.createElement("button"),
            span1 = document.createElement("span"),
            span2 = document.createElement("span");
          plans.className = "plans";
          interval.className = "interval";
          span1.className = "intr-name left";
          span2.className = "intr-name right";
          span1.innerHTML = step.input[1].interval[0];
          span2.innerHTML = step.input[1].interval[1];
          interval.appendChild(span1);
          interval.appendChild(span2);
          inputs.appendChild(plans);
          interval.ariaLabel = "Monthly";
          inputs.appendChild(interval);
          for (var i = 0; i < step.input[1].plan.length; i++) {
            var radio = document.createElement("input"),
              label = document.createElement("label"),
              $box = document.createElement("div"),
              img = document.createElement("img"),
              planName = document.createElement("h6"),
              pricing = document.createElement("p"),
              intervalname = document.createElement("span"),
              discount = document.createElement("p");
            radio.setAttribute("class", "radio");
            label.setAttribute("class", "label-plan label".concat(i + 1));
            label.setAttribute("data-plan", step.input[1].plan[i]);
            img.setAttribute("class", "img-plan");
            planName.setAttribute("class", "plan-name");
            pricing.setAttribute("class", "pricing");
            discount.setAttribute("class", "discount");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", "plan");
            radio.id = "plan" + i;
            label.htmlFor = radio.id;
            img.src = imgFolder.concat(step.input[1].imgName[i]);
            planName.innerHTML = step.input[1].plan[i];
            intervalname.innerHTML = "/".concat(intervalChosen);
            intervalChosen == "mo"
              ? (pricing.innerHTML = "$".concat(step.input[1].pricing[i]))
              : (() => {
                  pricing.innerHTML = "$".concat(step.input[1].pricing[i] * 10);
                  label.classList.add("yearly");
                  interval.ariaLabel = "Yearly";
                })();
            pricing.appendChild(intervalname);
            discount.innerHTML = "2 months free";
            label.appendChild(img);
            label.appendChild($box);
            $box.appendChild(planName);
            $box.appendChild(pricing);
            $box.appendChild(discount);
            plans.appendChild(radio);
            plans.appendChild(label);
            $box.className = "box-radio";
          }
          document.querySelectorAll(".label-plan").forEach((e) => {
            e.onclick = function () {
              planChosen = this.dataset.plan;
            };
          });
          document.querySelector(`[data-plan="${planChosen}"]`).click();
          interval.onclick = function () {
            if (intervalChosen == "mo") {
              intervalChosen = "yr";
              document
                .querySelectorAll(".label-plan")
                .forEach((e) => e.classList.add("yearly"));
              interval.ariaLabel = "Yearly";
            } else {
              intervalChosen = "mo";
              document
                .querySelectorAll(".label-plan")
                .forEach((e) => e.classList.remove("yearly"));
              interval.ariaLabel = "Monthly";
            }
            var pricings = document.querySelectorAll(".pricing");
            for (var i = 0; i < pricings.length; i++) {
              intervalChosen == "mo"
                ? (pricings[
                    i
                  ].innerHTML = `$${step.input[1].pricing[i]}/${intervalChosen}`)
                : (pricings[i].innerHTML = `$${
                    step.input[1].pricing[i] * 10
                  }/${intervalChosen}`);
            }
            pageHeight();
          };
        })()
      : num == 3
      ? (function () {
          for (var c = 0; c < 3; c++) {
            var div = document.createElement("div"),
              checkbox = document.createElement("input"),
              checkLabel = document.createElement("label"),
              $box = document.createElement("div"),
              $h6 = document.createElement("h6"),
              $p = document.createElement("p"),
              $span = document.createElement("span");
            inputs.appendChild(div);
            div.appendChild(checkbox);
            div.appendChild(checkLabel);
            checkLabel.appendChild($box);
            checkLabel.appendChild($span);
            $box.appendChild($h6);
            $box.appendChild($p);
            $h6.innerHTML = step.input[2].addon[c];
            $p.innerHTML = step.input[2].about[c];
            $span.innerHTML =
              intervalChosen == "mo"
                ? `+$${step.input[2].pricing[c]}/mo`
                : `+$${step.input[2].pricing[c] * 10}/yr`;
            div.className = "addon-box alabel".concat(c + 1);
            checkbox.className = "addon";
            checkLabel.className = "addon-label";
            $box.className = "addon-between";
            $h6.className = "addon-name";
            $p.className = "addon-about";
            $span.className = "addon-pricing";
            checkbox.type = "checkbox";
            checkbox.id = `addon${c}`;
            checkLabel.htmlFor = checkbox.id;
            if (addonsChosen[c]) checkLabel.click();
          }
          document.querySelectorAll(".addon-label")[0].onclick = function () {
            addonsChosen[0] = addonsChosen[0] ? false : true;
          };
          document.querySelectorAll(".addon-label")[1].onclick = function () {
            addonsChosen[1] = addonsChosen[1] ? false : true;
          };
          document.querySelectorAll(".addon-label")[2].onclick = function () {
            addonsChosen[2] = addonsChosen[2] ? false : true;
          };
        })()
      : num == 4
      ? (function () {
          var $box1 = document.createElement("div"),
            $box2 = document.createElement("div"),
            $btn = document.createElement("button"),
            $h6 = document.createElement("h6"),
            $p = document.createElement("p"),
            $box3 = document.createElement("div"),
            $box4 = document.createElement("div"),
            $p2 = document.createElement("p"),
            $h5 = document.createElement("h5"),
            planPricing =
              intervalChosen == "mo"
                ? step.input[1].pricing[step.input[1].plan.indexOf(planChosen)]
                : step.input[1].pricing[
                    step.input[1].plan.indexOf(planChosen)
                  ] * 10;
          $box1.appendChild($box2);
          $box1.appendChild($p);
          $box2.appendChild($h6);
          $box2.appendChild($btn);
          $box4.appendChild($p2);
          $box4.appendChild($h5);
          inputs.appendChild($box1);
          inputs.appendChild($box3);
          inputs.appendChild($box4);
          $h6.innerHTML = `${planChosen} (${
            intervalChosen == "mo" ? "Monthly" : "Yearly"
          })`;
          $btn.innerHTML = "Change";
          $btn.type = "button";
          $btn.ariaLabel = "Change plan";
          $btn.onclick = () => runStep(2);
          $p.innerHTML = `$${planPricing}/${intervalChosen}`;
          var totalAddonsPricing = 0;
          for (var e = 0; e < 3; e++) {
            if (addonsChosen[e]) {
              var div = document.createElement("div"),
                addonName = document.createElement("h6"),
                addonPricing = document.createElement("p"),
                pricing =
                  intervalChosen == "mo"
                    ? step.input[2].pricing[e]
                    : step.input[2].pricing[e] * 10;
              div.appendChild(addonName);
              div.appendChild(addonPricing);
              addonName.innerHTML = step.input[2].addon[e];
              addonPricing.innerHTML = `+$${pricing}/${intervalChosen}`;
              totalAddonsPricing += pricing;
              $box3.appendChild(div);
              div.className = "row";
              addonName.className = "gery";
            }
          }
          $p2.innerHTML = `Total(per ${
            intervalChosen == "mo" ? "month" : "year"
          })`;
          $h5.innerHTML = `+$${
            planPricing + totalAddonsPricing
          }/${intervalChosen}`;
          $box1.className = "row boxx1";
          $btn.className = "change ";
          $h6.className = "bold";
          $p.className = "bold";
          $p2.className = "gery";
          $h5.className = "bold blue";
          $box4.className = "row total";
        })()
      : num == 5
      ? (function () {
          var display = document.querySelector(".display"),
            img = document.createElement("img");
          display.innerHTML = "";
          data.classList.add("center");
          img.src = imgFolder.concat("icon-thank-you.svg");
          img.className = "thanks";
          data.append(img);
          addText(num);
          data.appendChild(heading);
          data.appendChild(about);
          display.appendChild(data);
          document.querySelector(".steps").classList.add("disabled");
          document.querySelector(".steps").ariaDisabled = true;
        })()
      : false;
  }
  info.addEventListener("click", (_) => {
    stepActive = 1;
    runStep(stepActive);
  });
  plan.addEventListener("click", (_) => {
    stepActive = 2;
    runStep(stepActive);
  });
  addons.addEventListener("click", (_) => {
    stepActive = 3;
    runStep(stepActive);
  });
  summary.addEventListener("click", (_) => {
    stepActive = 4;
    runStep(stepActive);
  });
  back.addEventListener("click", (_) => runStep(--stepActive));
  next.addEventListener("click", (_) => runStep(++stepActive));
  runStep(stepActive);
}
main();
