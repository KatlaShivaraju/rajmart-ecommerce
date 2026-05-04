package com.project.Ecommerce.Controller;

import com.project.Ecommerce.Model.Product;
import com.project.Ecommerce.Service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }


    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }


    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id){
        return service.getProductById(id);
    }

    @PostMapping("/products")
    public ResponseEntity<?> addProduct(
            @RequestParam String name,
            @RequestParam String brand,
            @RequestParam BigDecimal price,
            @RequestParam String description,
            @RequestParam MultipartFile file



    ) {
        try {
            Product product = new Product();
            product.setImageName(name);
            product.setBrand(brand);
            product.setPrice(price);
            product.setDescription(description);

            Product saved = service.addProduct(product, file);

            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/products/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable int id) {

        Product product = service.getProductById(id);

        String type = product.getImageType();

        if (type == null || type.isEmpty()) {
            type = "image/jpeg"; // fallback
        }

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(type))
                .body(product.getImage());
    }


    @PutMapping(value = "/products/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateProduct(
            @PathVariable int id,
            @RequestPart("product") String productJson,
            @RequestPart(value = "imagefile", required = false) MultipartFile imagefile) {

        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            Product product = mapper.readValue(productJson, Product.class);

            Product updated = service.updateProduct(id, product, imagefile);

            if (updated != null) {
                return new ResponseEntity<>("Successfully updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        Product product =service.getProductById(id);
        if(product != null){
            service.deleteProduct(id);
            return new ResponseEntity<>("Deleted Succesfully",HttpStatus.ACCEPTED);
        }
        else{
            return new ResponseEntity<>("failed to delete",HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword){
        List<Product> products=service.searchProducts(keyword);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }


}
