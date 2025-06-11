<script setup lang="ts">
import IconBack from '@/components/icons/IconBackBlack.vue'
import IconProfileEdit from '@/components/icons/IconProfileEdit.vue'
import IconCountry from '@/components/icons/IconCountry.vue'
</script>

<template>
  <div class="relative">
    <div
      class="wa-profile-header flex flex-row items-start px-4 py-8 min-h-[240px] bg-no-repeat bg-cover bg-center"
    >
      <div class="mt-2 shrink-0">
        <a href="/">
          <IconBack />
        </a>
      </div>
      <div class="flex flex-1 flex-col text-center justify-center">
        <h1 class="mb-6 font-medium text-[20px] leading-[28px]">Edit Profile</h1>
      </div>
    </div>
    <div class="wa-profile-image -mt-[60px] flex w-full absolute items-center justify-center">
      <div class="relative">
        <img class="" src="../../assets/default-avatar.png" alt="Profile Image" />
        <a href="#" class="absolute right-0 bottom-0">
          <IconProfileEdit />
        </a>
      </div>
    </div>
    <div class="flex flex-col mt-[80px] justify-center items-center">
      <h2 class="leading-[100%]">Jane Doe</h2>
      <ul class="wa-profile-info flex flex-row">
        <li class="text-[16px] leading-[100%]">jane@gmail.com</li>
        <li class="text-[16px] leading-[100%]">+01 234 567 89</li>
      </ul>
    </div>
  </div>

  <form class="mt-[31px] flex flex-col px-4 py-5">
    <div class="wa-form-controls flex flex-col min-h-[380px] gap-4">
      <div class="wa-form-control flex flex-col bg-[#F5F5F5] rounded-lg px-1 py-[9px]">
        <label class="text-[8px] leading-[100%]" for="fullName">Full name</label>
        <input
          id="fullName"
          type="text"
          class="text-[14px] mt-2 outline-0 leading-[100%] font-[510px]"
          value="Jane Doe"
        />
      </div>

      <div class="wa-form-control flex flex-col bg-[#F5F5F5] rounded-lg px-1 py-[9px]">
        <label class="text-[8px] leading-[100%]" for="email">Email</label>
        <input
          id="email"
          type="text"
          class="text-[14px] mt-2 outline-0 leading-[100%] font-[510px]"
          value="jane@gmail.com"
        />
      </div>

      <div class="wa-form-control flex flex-col bg-[#F5F5F5] rounded-lg px-1 py-[9px]">
        <label class="text-[8px] leading-[100%]" for="phone">Phone Number</label>
        <div class="flex justify-center items-center gap-1">
          <div class="shrink-0 mt-1">
            <IconCountry />
          </div>
          <div class="flex-1">
            <input
              id="phone"
              type="text"
              class="text-[14px] mt-2 outline-0 leading-[100%] font-[510px]"
              value="123 - 456 - 7890"
            />
          </div>
        </div>
      </div>
    </div>

    <button
      @click.prevent
      class="flex justify-center text-white text-[18px] leading-[28px] font-[590px] py-[12.5px] uppercase rounded-lg bg-[#2E3A5A]"
    >
      Edit
    </button>
  </form>
</template>

<style lang="scss" scoped>
.wa-profile-header {
  background-image: url("data:image/svg+xml,%3Csvg width='375' height='206' viewBox='0 0 375 206' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H390V181.785C390 181.785 271.719 206.096 194 206C117.05 205.905 0 181.785 0 181.785V0Z' fill='%23F5F8FF'/%3E%3C/svg%3E%0A");

  svg {
    fill: #000000;
  }
}
.wa-profile-image {
  height: 120px;

  img {
    height: 100%;
    width: 120px;
    object-fit: cover;
  }
}
.wa-profile-info {
  li {
    &::after {
      content: '|';
      margin-left: 5px;
      margin-right: 5px;
      font-size: 16px;
    }

    &:last-child::after {
      content: '';
    }
  }
}
form {
  .wa-form-control {
    box-shadow: 0px 2px 25px 1px rgba(0, 0, 0, 0.02);

    &:focus-within {
      outline: 2px solid #0060cc;
    }
  }
}
</style>
