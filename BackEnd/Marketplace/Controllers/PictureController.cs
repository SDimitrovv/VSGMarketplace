﻿using MarketplaceApplication.Models.PictureModels.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPictureService _pictureService;

        public PictureController(IPictureService pictureService) => _pictureService = pictureService;

        [HttpPost]
        public async Task<IActionResult> Add(int productId, IFormFile picture)
        {
            await _pictureService.UploadPicture(picture, productId);

            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        public async Task Edit(int id, IFormFile newPicture)
        {
            await _pictureService.DeletePicture(id);
            await _pictureService.UploadPicture(newPicture, id);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task Delete(int id)
        {
            await _pictureService.DeletePicture(id);
        }
    }
}
