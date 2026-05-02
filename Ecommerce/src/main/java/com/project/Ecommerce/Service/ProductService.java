package com.project.Ecommerce.Service;

import com.project.Ecommerce.Model.Product;
import com.project.Ecommerce.Repository.ProductRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {

 private final ProductRepo repo;

 public ProductService(ProductRepo repo) {
  this.repo = repo;
 }

 public List<Product> getAllProducts() {
  return repo.findAll();
 }
// public Product addProduct(Product product) {
//  return repo.save(product);
// }

 public Product getProductById(int id) {
  return repo.findById(id).get();
 }

 public Product addProduct(Product product, MultipartFile imagefile) throws IOException {
  product.setImageName(imagefile.getOriginalFilename());
  product.setImageType(imagefile.getContentType());
  product.setImage(imagefile.getBytes());
  return repo.save(product);
 }


 public Product updateProduct(int id, Product product, MultipartFile imagefile) throws IOException {
  product.setImage(imagefile.getBytes());
  product.setImageName(imagefile.getOriginalFilename());
  product.setImageType(imagefile.getContentType());
  return repo.save(product);
 }

 public void deleteProduct(int id) {
  repo.deleteById(id);

 }

 public List<Product> searchProducts(String keyword) {
  return repo.searchProducts(keyword);
 }
}
