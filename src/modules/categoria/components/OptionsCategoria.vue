<template>
  <div class="d-flex justify-content-center">
        <router-link to="/" class="btn btn-secondary ms-3 me-3">
            <i class="fa fa-home"></i> &nbsp;
            Regresar al Menú
        </router-link>
        <router-link :to="{ name : 'lista-categorias' }" class="btn btn-primary ms-3 me-3">
            <i class="fa fa-eye"></i> &nbsp;
            Ver Categorías
        </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>