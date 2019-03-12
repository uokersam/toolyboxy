(function() {

  let clipBoardContent = '';

  mf.button.addEventListener('click', function() {

    if (!window.isSecureContext) {
      throw new ContextError('Context is not secure');
    }

    navigator.clipboard.readText().then(text => {
      let temp = text;
      mf.in.value = temp;

      temp = temp.replace(/"/g, '\\"').
          replace(/\$x\$/g, '\\$x\\$').
          replace(/;;/g, ';').
          replace(/^--.*\r?\n/gm, '').
          replace(/^\s*\r?\n/gm, '').
          replace(/.+/gm, function(match, p1, p2, p3, offset, string) {
            return '$this->addSql("' + match + '");';
          });

      mf.out.value = temp;
      clipBoardContent = temp;

    }).then(() => {
      navigator.clipboard.writeText(clipBoardContent).catch(err => {
        console.log('Failed to write to clipboard: ', err);
      });
    }).catch(err => {
      console.log('Failed to read from clipboard', err);
    });

    changeButtonContent(mf.button, 'Copied!');

    setTimeout(function() {
      mf.button.classList.remove('is-success');
      mf.button.classList.add('is-primary');
      mf.button.textContent = 'Format and copy';
    }, 1000);
  });

  mf.clear.addEventListener('click', function() {
    mf.in.value = '';
    mf.out.value = '';
  });

  sql.button.addEventListener('click', function() {
    navigator.clipboard.readText().then(text => {
      let temp = text;
      sql.in.value = temp;

      temp = temp.replace(/\s\s+/g, ' ').replace(/\n/g, ' ');

      sql.out.value = temp;
      clipBoardContent = temp;

    }).then(() => {
      navigator.clipboard.writeText(clipBoardContent).catch(err => {
        console.log('Failed to write to clipboard: ', err);
      });
    }).catch(err => {
      console.log('Failed to read from clipboard', err);
    });

    changeButtonContent(sql.button, 'Copied!');

    //todo insert setTimeout inside changeButtonContent function
    setTimeout(function() {
      sql.button.classList.remove('is-success');
      sql.button.classList.add('is-primary');
      sql.button.textContent = 'Format and copy';
    }, 1000);

  });

  sql.clear.addEventListener('click', function() {
    sql.in.value = '';
    sql.out.value = '';
  });

})();