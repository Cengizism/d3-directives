'use strict';

angular.module('d3App.directives', [])
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

            var width   = attrs.width - attrs.left - attrs.right,
                height  = attrs.height - attrs.top - attrs.bottom;

            var data = scope.data;

            var x = d3.scale
                      .ordinal()
                      .rangeRoundBands([0, width], .1);

            var y = d3.scale
                      .linear()
                      .rangeRound([height, 0]);

            var color = d3.scale
                          .ordinal()
                          .range(["#98abc5", "#8a89a6"]);

            var xAxis = d3.svg
                          .axis()
                          .scale(x)
                          .orient("bottom");

            var yAxis = d3.svg
                          .axis()
                          .scale(y)
                          .orient("left")
                          .tickFormat(d3.format(".2s"));

            var svg = d3.select(ele[0])
                        .append("svg")
                        .attr("width", width + attrs.left + attrs.right)
                        .attr("height", height + attrs.top + attrs.bottom)
                        .append("g")
                        .attr("transform", "translate(" + attrs.left + "," + attrs.top + ")");

            color.domain(d3.keys(data[0])
                  .filter(function (key) { return key !== "year"; }));

            data.forEach(
              function (d)
              {
                var y0 = 0;

                d.years = color
                  .domain()
                  .map(function (name)
                  {
                    return {name: name, y0: y0, y1: y0 += +d[name]};
                  });

                d.total = d.years[d.years.length - 1].y1;
              }
            );

            $window.onresize = function ()
            {
              scope.$apply();
            };

            scope.$watch(
              function ()
              {
                return angular.element($window)[0].innerWidth;
              },
              function ()
              {
                scope.render(scope.data);
              }
            );

            scope.$watch('data', function (newData) { scope.render(newData) }, true);

            scope.render = function (data)
            {
              svg.selectAll('*').remove();

              if (!data) return;
              if (renderTimeout) clearTimeout(renderTimeout);

              renderTimeout = $timeout(function ()
              {
                data.sort(function (a, b) { return a.year - b.year; });

                x.domain(data.map(function (d) { return d.year; }));

                y.domain([0, d3.max(data, function (d) { return d.total; }) + 40]);

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

                var year = svg.selectAll(".year")
                              .data(data)
                              .enter().append("g")
                              .attr("class", "g")
                              .attr("transform", function (d) { return "translate(" + x(d.year) + ",0)"; });

                year.selectAll("rect")
                    .data(function (d) { return d.years; })
                    .enter().append("rect")
                    .attr("width", x.rangeBand())
                    .attr("y", function (d) { return y(d.y1); })
                    .attr("height", function (d) { return y(d.y0) - y(d.y1); })
                    .style("fill", function (d) { return color(d.name); });

                var legend = svg.selectAll(".legend")
                                .data(color.domain().slice().reverse())
                                .enter().append("g")
                                .attr("class", "legend")
                                .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

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

              }, 200);

            };

          }};
      }
    ]);