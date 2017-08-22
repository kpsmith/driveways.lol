import React from 'react';

import { StaticRouter, BrowserRouter, Route} from 'react-router-dom';

import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import RootPage from './components/RootPage';
import StaticS3 from 'components/docs/StaticS3';
import Content from 'components/Content';

const inner = (<RootPage>
    <Route path="" component={Content}/>
    <Route path="/docs/static_s3" component={StaticS3}/>
</RootPage>);

const get_html = (rendered) => {
    return `<!doctype html>
        <html>
            <head>
                <link rel="icon" type="image/png" href="/img/favicon.png"/>
                <link rel="stylesheet" href="/css/style.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
                <script src="/bundle.js" async></script>
            </head>
            <body>
                <div id="react-mount-point">${rendered}</div>
            </body>
        </html>`;
};



if (typeof window !== 'undefined' && window.document) {
    ReactDOM.render(<BrowserRouter>{inner}</BrowserRouter>, document.getElementById('react-mount-point'))
} else {
    module.exports = function(path, props, f) {
        const html = get_html(ReactDOMServer.renderToString(<StaticRouter location={path} context={props}>
            {inner}
        </StaticRouter>));
        f(html);
    };
}