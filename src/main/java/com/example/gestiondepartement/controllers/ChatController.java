//package com.example.gestiondepartement.controllers;
//import io.getstream.chat.java.models.User;
//import io.getstream.chat.java.models.UserToken;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class ChatController {
//
//    @GetMapping("/token")
//    public String getToken(@RequestParam String userId) {
//        String apiKey = "your_stream_api_key";
//        String apiSecret = "your_stream_api_secret";
//
//        UserToken token = User.requestToken()
//                .userId(userId)
//                .apiKey(apiKey)
//                .apiSecret(apiSecret)
//                .generate();
//
//        return token.getToken();
//    }
//}
