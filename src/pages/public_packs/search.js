import {List, Container, Card} from "semantic-ui-react";
import {Helmet} from "react-helmet";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {api_url} from "../../config";
import {parse} from "query-string";
import EmoteSearchComponent from "../../components/emote_search";
import {Emote} from "../../components/emote";


import '../../semantic/src/definitions/elements/list.less';
import '../../semantic/src/definitions/views/card.less';

import './search.css';


function PublicPacks(props) {
  const query = parse(props.location.search);

  const [packs, setPacks] = useState({});
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState(query.search || "");
  const [page, setPage] = useState(parseInt(query.page) || 0);

  useEffect(() => {runSearch(search, page, setPacks, setTotal)}, []);

  return (
    <>
      <Helmet>
        <title>{`${total} Pack${total === 1? '': 's'} Found`}</title>
      </Helmet>
      <Container>
        <h1>
          Public Discord Emoji Server List
        </h1>
        <p>
          Search through NQN's list of publicly available packs.
          Download any and all emojis, or join the Discord server by selecting a pack.
        </p>
        <EmoteSearchComponent
          search={(search, page) => {
            setSearch(search);
            setPage(page);
            const newParams = new URLSearchParams({search, page});
            props.history.replace(`${window.location.pathname}?${newParams.toString()}`);
            runSearch(search, page, setPacks, setTotal)
          }}
          renderer={() =>
            <List>
              {Object.entries(packs).map(([name, {emotes}]) => {
                const totalEmotes = emotes.length;
                const totalAnimated = emotes.filter(e => e.animated).length;
                const totalStatic = totalEmotes - totalAnimated;
                return (
                  <List.Item key={name}>
                    <Card fluid className="flex_row" onClick={() => {
                      props.history.push(`/packs/${name}`);
                    }}>
                      <Card.Content>
                        <h3>{name}</h3>
                        {totalEmotes} total emojis, {totalAnimated} animated and {totalStatic} static
                      </Card.Content>
                      <Card.Content className="flex_row_reverse">
                        {emotes.slice(0, 5).map(emote => {
                          const emojiObj = new Emote(emote);
                          return emojiObj.renderImg();
                        })}
                      </Card.Content>
                    </Card>
                  </List.Item>
                );
              })}
            </List>
          }
          term={search}
          pageNo={page}
          totalResults={total}
        />
      </Container>
    </>
  );
}


async function runSearch(term, pageNo, setPacks, setTotal) {
  const packData = await axios.get(`${api_url}/packs/search`, {params: {term, page_no: pageNo, force_public: 1}});
  setPacks(packData.data.results);
  setTotal(packData.data.total);
}

export default PublicPacks;
