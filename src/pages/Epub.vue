<template>
  <MainLayout>
    <div slot="header">Footer Here</div>

    <div slot="default" style="height: 100%">
      <q-page class='flex flex-center' style="height: 100%;">
        <div ref="bookarea" id="bookarea"></div>
      </q-page>
    </div>

    <div slot="footer">
      <div class="book-controls">
        <button @click="expose">Expose</button>
        <button @click="renditionAction('prev')">Prev</button>
        <button @click="renditionAction('next')">Next</button>
        <button @click="resizeBook">Resize</button>
      </div>
    </div>

  </MainLayout>
</template>

<script>
import ePub from 'epubjs';
import MainLayout from 'layouts/MainLayout';

export default {
  name: 'Epub',
  data () {
    return {
      rendition: null,
      book: null,
      displayed: null
    }
  },
  methods: {
    expose () {
      console.log(
        this.$refs.bookarea.clientWidth,
        this.$refs.bookarea.clientHeight
      )
      // console.log('rendition', this.rendition);
      // console.log('book', this.book);
      // console.log('displayed', this.displayed);
    },
    renditionAction (action) {
      if (this.rendition) {
        this.rendition[action]();
      }
    },
    registerHooks () {
      this.rendition.hooks.content.register((contents, view) => {
        const frame = contents.document.defaultView.frameElement
        const viewElementRect = frame.getBoundingClientRect()
        // console.log('rendition:hooks:content', viewElementRect);
      });

      // https://github.com/futurepress/epub.js/blob/99273e7356fb009d277053649b8d43c90bc89170/examples/highlights.html
      this.rendition.on('selected', function (cfiRange, contents) {
        console.log('rendition:selected', cfiRange, contents);
      })

      // https://github.com/futurepress/epub.js/issues/761
      this.book.spine.hooks.serialize.register((output, section) => {
        // console.log('hooks:serialize', output, section);
      });

      this.book.spine.hooks.content.register((output, section) => {
        // console.log('spine:hooks:content', output, section);
      });
    },
    createBook (event, data) {
      console.log(event, data);
      const fileData = data.fileData;
      if (this.book) {
        this.book.destroy();
      }
      this.book = ePub();
      this.book.open(fileData, 'binary');
      console.log(this.$refs.bookarea);
      this.rendition = this.book.renderTo('bookarea', {
        width: this.$refs.bookarea.clientWidth + 'px',
        height: this.$refs.bookarea.clientHeight + 'px',
        spread: 'always'
      });

      this.registerHooks();

      this.displayed = this.rendition.display();
    },
    resizeBook () {
      console.log('resizeBook');
      if (this.rendition) {
        const height = this.$refs.bookarea.clientHeight + 'px';
        const width = this.$refs.bookarea.clientWidth + 'px';
        this.rendition.resize(width, height);
      }
    }
  },
  components: {
    MainLayout
  },
  mounted () {
    console.log('mounted');
    window.ipcRenderer.on('open-file-reply', this.createBook);
    window.addEventListener('resize', this.resizeBook);
  },
  beforeDestroy () {
    console.log('beforeDestroy');
    window.ipcRenderer.removeListener('open-file-reply', this.createBook);
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener('resize', this.resizeBook);
  }
}
</script>

<style scoped>
#bookarea{
  width: 100%;
  height: 100%;
  display: flex;
}
.book-controls{
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
