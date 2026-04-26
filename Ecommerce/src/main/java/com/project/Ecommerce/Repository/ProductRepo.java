package com.project.Ecommerce.Repository;

import com.project.Ecommerce.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.math.BigDecimal;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    List<Product> findByName(String name);

    List<Product> findByBrand(String brand);

    List<Product> findByCategory(String category);

    List<Product> findByAvailable(boolean available);

    List<Product> findByPriceGreaterThan(BigDecimal price);

    List<Product> findByPriceLessThan(BigDecimal price);

    List<Product> findByQuantityGreaterThan(int quantity);
}
