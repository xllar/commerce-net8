
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.interfaces;
using Core.Interfaces;
using Core.Specification;
using Infastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    public class ProductsController : BaseApiController
    {
        //private readonly IProductRepository _repo;
        
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;
       
       public ProductsController(IGenericRepository<Product> productsRepo,
      IGenericRepository<ProductBrand> productBrandRepo, IGenericRepository<ProductType>
      productTypeRepo, IMapper mapper)
       {
            _mapper = mapper;
             _productsRepo = productsRepo;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
          
        
       }

        // GET api/products
        [HttpGet]
        public async Task<ActionResult<List<ProductToReturnDto>>> GetProducts()
        {
          var spec = new ProductsWithTypesAndBrandsSpecification();
          var products = await _productsRepo.ListAsync(spec);
          
          return Ok(_mapper
          .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
          
        }

        // GET api/products/{id}
        [HttpGet("{id}")]

        //swager
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        /////////////////////////////////////////
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {  
             var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);

              if(product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands(){

            return Ok (await _productBrandRepo.ListAllAsync());
        }

         [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes(){

            return Ok (await _productTypeRepo.ListAllAsync());
        }
    }
}
