'use strict';
app.factory('MarkerFactory', function () {

    var markerId = 0;

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 4,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel',
                icon:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAExklEQVRYR8WXWUxcVRiA/3PvXJiVRU0LlkpnEmZhoNgEQWOKTVsba+LSaKPdjAsqxUhiQ3nQtjYN1NpIgw9N06LG+FB86INbmzSmqSbGLTiC6awUZoxtEaoCMwzMds/xnKszzAxD72XAOE/knn/5zr+dHwT/8w/l458Qwg36BssFTiih+iQqRifXWdaNIoTIYu0pBnB4HHdqC7S7gIOHCYEGnuO16c4IJmFA5AcMcD48E+qrr64fVQIjC8Acawr1nRyBPYhHKiVGaYTiNDAfJsKJQ3a7/fdb6dwSwDvi3QMcOklDa1DiOFsGExIkRGyxGW19C+nnBKA3QN7A0DGOQx35OM7WISI+ajaaD+SqkZwAHr/v7eVynoRhEBaT5Y1suHkALOyI5z5ajptn20hgvKPaaPk4/XsGwIB3YJWmUOvON+dy0JjgKTGcsKYXZgaA2+/7gOfQc3KGlnJOCO61rLG8lLSRApBuL2gDrNVQIgorzh8EhMW8fYXqHoOwqWmePmvR0EywMjknUgCeEc9+juePMw1+ZgJM3Q15O2eK+N7dcH19G0TUpfPsiCJut5ks3exgDiDgucwhfoMEEP4DTCfuWxIArG8GsellGEHF1EtmrdM0XKJp2JwCYLPdE/CGkuMVBW9Cae8LANqivCC42AwYGraA6ql3IPjtWRiryIwmEcm02VhVxOaChMbyr1XrrqW8hSZAeLVxUc61uw+A9pG9czrTE6CvMEHiiy6Ieb+Cv+5vgdnKOZvx6Vg56wYJwDnktAsFBVeWAqB/vgs029oyoPkbblBd+RRUFzoBq4theH9/6jwei9ntVXZXEqCaAjiXAqDe2gzqpicyo0afTeHqRdB93QO40ADDHY7UeSQya1trWeuRANiLp9cYri8F4M+4DhKEg5UFoUyI0jtAb1wNJTE/+Nt/TJ1Fg5Gy2traMQmAPT6+wFAIcUgnSeRRA7IFU26E+FsXJTHqL2SurCpOFSH76A14LyHEbUwHoBHM7CC278huEAugaAwQP/WTdCiK5EubybyF/Z0y5w549/GIk4YDi4CKdgE7/GVSA9+M8WAuJrC5LAxKdi6O6o1GBPjsNzWUCADbKqdBKFRD/MygZB5j8TWr0dqTAdDv6i83aIt+pWERYDYEQivrXQzt/VrYdfQYnOs+AXtXXIMKXUI22kygx6kB6zOtcNXxM9hufAebjByNgIOFPxYLRe9i+c8A+DcNvTQNzekeOu5uhJ2HDsInPe9Cy5mTUGY1KwN4dDvYNjwAwwODYG28Bza+8s/7gzE5ZTWaW5NGMjLqdDrLeJ3g5RBKjcCAYxAun34Pah/cBPVPPq7IOROaGr8Jn3cdh9tXr4KH9rUB4jigz/FkdCpiqaurG88JwD66/e4dPKc6q9jTIgSxKG63mqzn0lVy1jTdirroVvT6ImzLiooYH7EZLW9mCy64lPr8vs7lgmDOrWvMhxUvpUlKl9/7NK2H0+k1IXvVNAGWc5r4F7PDLpuCdAFWmCqd6ggdGc9KLargx1qNDrH3o8HZw+kFl0tV8Vxjc0KnNuykxbwVMGqkq5s+3SAbrxjD9wjhC/HpeF+yz+V4FQNkOUMul2slFMBtIhYxiqGJmpqa8f/0n1O5m+R7/jeDj98wEsPYhgAAAABJRU5ErkJggg=="
            },
            latitude: latitude,
            longitude: longitude,
            id: ++markerId
        };
        return marker;
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }


    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                // alert("Unknown address: " + address);
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('Unable to locate current position');
        }
    }


    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

});