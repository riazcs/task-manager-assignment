<template>
    <div class="d-flex" id="wrapper">
        <div class="bg-dark border-end" id="sidebar-wrapper">
          <div class="list-group list-group-flush">
            <router-link
              to="/dashboard"
              class="list-group-item list-group-item-action list-group-item-light bg-dark text-white"
            >
              Dashboard
            </router-link>
    
            <router-link
              to="/create-task"
              class="list-group-item list-group-item-action list-group-item-light bg-dark text-white"
            >
              <i class="bi bi-table"></i> Tasks
            </router-link>
          </div>
        </div>
    
        <div id="page-content-wrapper">
          <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <form class="d-flex ms-3">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
    
            <div class="navbar-collapse collapse justify-content-end" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="bi bi-person-circle"> </i> {{ user.name }}
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" href="javascript:void(0)" @click="logout">Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
    
          <div class="container-fluid">
          </div>
        </div>
      </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
#wrapper {
  display: flex;
  flex-direction: row;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  transition: margin 0.25s ease-out;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

#page-content-wrapper {
  width: 100%;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }
}
</style>