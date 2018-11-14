"use strict";
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var ImageService = (function () {
    function ImageService(http) {
        this.http = http;
        var YaunlaideFile = window.File;
        window.File = function (chunks1, filename1, opts1) {
            if (opts1 === void 0) { opts1 = {}; }
            try {
                return function () { YaunlaideFile.call(this, chunks1, filename1); };
            }
            catch (error) {
                return function () {
                    Blob.call(this, chunks1, opts1);
                    this.lastModifiedDate = new Date();
                    this.lastModified = +this.lastModifiedDate;
                    this.name = filename1;
                };
            }
        };
    }
    ImageService.prototype.postImage = function (url, image, headers, partName, customFormData, withCredentials) {
        if (partName === void 0) { partName = 'image'; }
        if (!url || url === '') {
            throw new Error('Url is not set! Please set it before doing queries');
        }
        var options = new http_1.RequestOptions();
        if (withCredentials) {
            options.withCredentials = withCredentials;
        }
        if (headers) {
            options.headers = new http_1.Headers(headers);
        }
        var formData = new FormData();
        for (var key in customFormData) {
            formData.append(key, customFormData[key]);
        }
        formData.append(partName, image);
        return this.http.post(url, formData, options);
    };
    return ImageService;
}());
ImageService.decorators = [
    { type: core_1.Injectable },
];
ImageService.ctorParameters = function () { return [
    { type: http_1.Http, },
]; };
exports.ImageService = ImageService;
