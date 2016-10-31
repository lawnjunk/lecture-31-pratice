'use strict';

module.exports = ['$log', '$http', 'Upload', 'authService', picService ];

function picService($log, $http, Upload, authService){
  $log.debug('init picService');
  let service = {};

  service.uploadGalleryPic = function(galleryData, picData){
    $log.debug('picService.uploadGalleryPic()');
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`,
      };

      return Upload.upload({
        url,
        headers,
        method: 'Post',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file,
        },
      })
    })
    .then( res => {
      galleryData.pics.unshift(res.data);
      $log.log(res.data);
      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return Promise.reject(err);
    })
  };

  return service;
};
