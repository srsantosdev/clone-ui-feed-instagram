/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';

import LazyImage from '~/components/LazyImage';

import { Post, Header, Avatar, Name, Description, Loading } from './styles';

const Feed = ({ navigation }) => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  async function loadPage(pageNumber = page, shoudRefresh = false) {
    if (total && pageNumber > total) {
      return;
    }

    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
    );

    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');

    setTotal(Math.floor(totalItems / 5));
    setFeed(shoudRefresh ? data : [...feed, ...data]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  async function refreshList() {
    setRefreshing(true);
    await loadPage(1, true);
    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  const renderLoading = () => {
    if (loading) {
      return <Loading />;
    }
    return false;
  };

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={post => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderLoading}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 10 }}
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({ item }) => {
          return (
            <Post>
              <Header>
                <Avatar source={{ uri: item.author.avatar }} />
                <Name>{item.author.name}</Name>
              </Header>
              <LazyImage
                shouldLoad={viewable.includes(item.id)}
                ratio={item.aspectRatio}
                source={{ uri: item.image }}
                smallSource={{ uri: item.small }}
              />
              <Description>
                <Name>{item.author.name}</Name>
                <Text>{item.description}</Text>
              </Description>
            </Post>
          );
        }}
      />
    </View>
  );
};

export default Feed;
