package com.example.backend.repository;

import com.example.backend.model.ChatRoom;
import jakarta.annotation.Nonnull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNullApi;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    @EntityGraph(attributePaths = "users")
    Optional<ChatRoom> findById(Long id);
    @Query("SELECT c FROM ChatRoom c JOIN c.users u WHERE c.name = :name " +
            "GROUP BY c HAVING COUNT(u) = :userCount AND COUNT(u.id IN :users) = :userCount")
    Optional<ChatRoom> findByNameAndUsers(@Param("name") String name,
                                          @Param("userCount") int userCount,
                                          @Param("users") Set<Long> users);

}

