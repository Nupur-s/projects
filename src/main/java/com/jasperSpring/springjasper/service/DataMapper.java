package com.jasperSpring.springjasper.service;

import com.jasperSpring.springjasper.model.Order;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DataMapper {

    public Context setData(List<Order> items, Long total, String customer, Date date) {

        Context context = new Context();

        Map<String, Object> data = new HashMap<>();

        data.put("items", items);
        data.put("total",total);
        data.put("customer",customer);
        data.put("date",date);
        context.setVariables(data);

        return context;
    }
}