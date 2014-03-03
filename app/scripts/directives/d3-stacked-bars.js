'use strict';

angular.module('d3StackedBarsApp.directives', [])
.directive('d3StackedBars',
      [
        '$window', '$timeout',
        function ($window, $timeout)
        {          
          return {
            restrict: 'EA',
            scope: {
              data:     '=',
              label:    '@',
              onClick:  '&'
            },
            link: function (scope, ele, attrs)
            {
              var renderTimeout;            
              
              var margin  = {top: 20, right: 20, bottom: 30, left: 40},
                  width   = 960 - margin.left - margin.right,
                  height  = 500 - margin.top - margin.bottom;

              var data = scope.data;

              var x = d3.scale.ordinal()
                        .rangeRoundBands([0, width], .1);

              var y = d3.scale.linear()
                        .rangeRound([height, 0]);

              var color = d3.scale.ordinal()
                            .range(["#98abc5", "#8a89a6"]);

              var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");

              var yAxis = d3.svg.axis()
                            .scale(y)
                            .orient("left")
                            .tickFormat(d3.format(".2s"));

              var svg = d3.select("body").append("svg")
                          .attr("width", width + margin.left + margin.right)
                          .attr("height", height + margin.top + margin.bottom)
                          .append("g")
                          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
              color.domain(d3.keys(data[0])
                .filter(function(key) { return key !== "year"; }));

              data.forEach(
                function (d)
                {
                  var y0 = 0;

                  d.ages = color
                    .domain()
                    .map(function (name)
                    {
                      return {name: name, y0: y0, y1: y0 += +d[name]};
                    });

                  d.total = d.ages[d.ages.length - 1].y1;
                }
              );

              // data.sort(function (a, b) { return b.total - a.total; });

              x.domain(data.map(function (d) { return d.year; }));
              y.domain([0, d3.max(data, function (d) { return d.total; })]);

              svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

              svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Costs");

              var year = svg.selectAll(".state")
                .data(data)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform",
                function (d)
                {
                  return "translate(" + x(d.year) + ",0)";
                });

              year.selectAll("rect")
                .data(function (d) { return d.ages; })
                .enter().append("rect")
                .attr("width", x.rangeBand())
                .attr("y",
                function (d)
                {
                  return y(d.y1);
                })
                .attr("height", function (d)
                {
                  return y(d.y0) - y(d.y1);
                })
                .style("fill", function (d) { return color(d.name); });


              var legend = svg.selectAll(".legend")
                .data(color.domain().slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform",
                function (d, i)
                {
                  return "translate(0," + i * 20 + ")";
                });

              legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

              legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) { return d; });
              
              
              
              
//              $window.onresize = function () { scope.$apply(); };
//
//
//
//              scope.$watch(
//                function () { return angular.element($window)[0].innerWidth; },
//                function () { scope.render(scope.data); }
//              );
//
//
//              scope.$watch('data', function (newData) { scope.render(newData) }, true);
//
//
//
//              scope.render = function (data)
//              {
//
//                // svg.selectAll('*').remove();
//
//                if (!data) return;
//                if (renderTimeout) clearTimeout(renderTimeout);
//
//
//
//                renderTimeout = $timeout(function ()
//                {
//
//
//
//
//
//
//
//
//
//
//                }, 200);
//
//
//
//
//              };
              
              
              
              

            }}
        }
      ]);