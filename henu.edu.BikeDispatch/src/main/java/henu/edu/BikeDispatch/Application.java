package henu.edu.BikeDispatch;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@MapperScan("henu.edu.BikeDispatch.Dao")
@SpringBootApplication
public class Application {
    public static void main(String[] args) throws Exception {
        System.out.println("启动成功！");
        SpringApplication.run(Application.class, args);
    }
}
