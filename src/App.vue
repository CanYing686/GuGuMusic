<template>
  <div class="container">
    <TheNav />
  </div>
  <FooterItem />
</template>

<script>
import TheNav from "@/components/TheNav";
import FooterItem from "@/components/FooterItem.vue";
export default {
  name: "App",
  components: {
    TheNav,
    FooterItem,
  },
};
</script>

