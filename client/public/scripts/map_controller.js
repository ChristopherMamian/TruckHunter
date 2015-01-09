'use strict';
app.controller('MapCtrl', ['MarkerFactory', 'TruckFactory', '$scope', function(MarkerFactory, TruckFactory, $scope) {


    $scope.$parent.$watch("trucks", function(newValue, oldValue) {
        // alert($scope.$parent.trucks.length);
        // $scope.map.markers.length = 0;
        // alert($scope.$parent.trucks.length);
        var trucks = $scope.$parent.trucks;
        console.log(trucks);
        if (trucks && trucks.length > 0) {
            for(var i = 0; i < trucks.length; i++){
                var address = trucks[i].currentAddress;
                var name = trucks[i].truckName;
                if (address) {
                    MarkerFactory.createByAddress(address, function(marker) {
                        // marker.options.labelContent = name;
                        $scope.map.markers.push(marker);
                        refresh(marker);
                    });
                }
            }
        }
    });

    // $scope.$parent.$watch("filteredTrucks", function(newValue, oldValue) {
    //     // console.log($scope.map.markers);
    //         $scope.map.markers.length = 0;
    //         // console.log($scope.map.markers);
    //     var filteredTrucks = $scope.$parent.filteredTrucks;
    //     if (filteredTrucks && filteredTrucks.length > 0) {
    //         for(var i = 0; i < filteredTrucks.length; i++){
    //             var address = filteredTrucks[i].currentAddress;
    //             // var name = filteredTrucks[i].truckName;
    //             if (address) {
    //                 console.log("inside address block");
    //                 MarkerFactory.createByAddress(address, function(marker) {
    //                     // marker.options.labelContent = name;
    //                     $scope.map.markers.push(marker);
    //                     refresh(marker);
    //                 });
    //             }
    //         }
    //     }
    // });

    $scope.$watch("map.markers", function(newValue, oldValue) {
        // if(newValue == oldValue){
        //     return;
        // }

        // console.log(JSON.stringify(newValue));
        // alert(JSON.stringify(newValue.length));
    }, true);

    $scope.$parent.$watch("myTrucks", function(newValue, oldValue) {
        var myTrucks = $scope.$parent.myTrucks;
        if (myTrucks && myTrucks.length > 0) {
            for(var i = 0; i < myTrucks.length; i++){
                var address = myTrucks[i].currentAddress;
                if (address) {
                    MarkerFactory.createByAddress(address, function(marker) {
                        $scope.map.markers.push(marker);
                        refresh(marker);
                    });
                }
            }
        }
    });

        MarkerFactory.createByCoords(37.779277, -122.41927, function(marker) {
            $scope.sfMarker = marker;
        });

        $scope.address = '';

        $scope.map = {
            center: {
                latitude: $scope.sfMarker.latitude,
                longitude: $scope.sfMarker.longitude
            },
            zoom: 12,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        };

        $scope.map.markers.push($scope.sfMarker);

        $scope.clearMarkers = function () {
            console.log("fck");
            $scope.map.markers = [];
        }

        $scope.addCurrentLocation = function () {
            MarkerFactory.createByCurrentLocation(function(marker) {
                marker.options.labelContent = 'You´re here';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };

        $scope.addAddress = function() {
            //add addresses here from truckFactory
            var address = $scope.address;
            if (address !== '') {
                MarkerFactory.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }

    }])