using MarketplaceAPI.Identity;
using MarketplaceApplication.Models.PictureModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPictureService _pictureService;

        public PictureController(IPictureService pictureService) => _pictureService = pictureService;

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpPost]
        public async Task<IActionResult> Add(int productId, IFormFile picture)
        {
            var imageUrl = await _pictureService.UploadPicture(picture, productId);

            return CreatedAtAction(null, imageUrl);
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Edit(int id, IFormFile newPicture)
        {
            await _pictureService.DeletePicture(id);
            var imageUrl = await _pictureService.UploadPicture(newPicture, id);

            return Ok(imageUrl);
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _pictureService.DeletePicture(id);

            return Ok();
        }
    }
}
