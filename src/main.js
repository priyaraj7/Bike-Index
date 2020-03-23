import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import { BikeIndex } from "../src/bike-index.js";

$(document).ready(function() {
  $("#bikeIndex").click(function() {
    const manufacturer = $("#manufacturer").val();
    $("#manufacturer").val(""); // for clearing the input
    const location = $("#location").val();
    $("#location").val("");

    (async () => {
      let bikeIndex = new BikeIndex();
      const response = await bikeIndex.getBike(manufacturer, location);
      getElements(response);
    })();
    function getElements(response) {
      if (response) {
        $(".output").empty();

        for (let i = 0; i < response.bikes.length; i++) {
          const bike = response.bikes[i];
          const row = $("<div>").addClass(
            `row ${i % 2 === 0 ? "odd" : "even"}`
          );
          const imgCol = $("<div>")
            .addClass("col-md-4 img")
            .appendTo(row);
          $("<img>")
            .addClass("bike-image")
            .attr("src", bike.thumb)
            .appendTo(imgCol);
          const titleCol = $("<div>")
            .addClass("col-md-4")
            .appendTo(row);
          $("<div>")
            .addClass("title")
            .text(bike.title)
            .appendTo(titleCol);
          $("<div>")
            .addClass("serial")
            .append($("<strong>").text("Serial: "))
            .append(bike.serial)
            .appendTo(titleCol);
          $("<div>")
            .addClass("color")
            .append($("<strong>").text("Color: "))
            .append(bike.frame_colors)
            .appendTo(titleCol);
          const dateCol = $("<div>")
            .addClass("col-md-4")
            .appendTo(row);
          const stolenDate = new Date(bike.date_stolen * 1000);
          $("<div>")
            .addClass("date")
            .append($("<strong>").text("Date&Time: "))
            .append(
              ` ${stolenDate.toLocaleDateString()} ${stolenDate.toLocaleTimeString()}`
            )
            .appendTo(dateCol);
          $("<div>")
            .addClass("location")
            .append($("<strong>").text("Location: "))
            .append(bike.stolen_location)
            .appendTo(dateCol);

          $(".output").append(row);
          // $("<div>")
          //   .attr("class", "myclass")
          //   .text(title)
          //   .appendTo(result);
          //$(".output").append(result);
        }
      } else {
        $(".output").text(`There was an error handling your request.`);
      }
    }
  });
});
