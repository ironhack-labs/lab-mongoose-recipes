const React = require("react");

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Books App</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
}

module.exports = Layout;
